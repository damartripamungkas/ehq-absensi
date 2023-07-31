const path = require('path');
const cluster = require('cluster');
const nodecron = require('node-cron');
const sequelize = require('./sequelize');
const getTime = require('../utils/time/time');
const { Op, Absens, Cron, Persons, PersonsRp, AccessKey } = sequelize;
const { time_absen } = require(path.join(process.cwd(), "config", "config.json"));
const log = require('../utils/logger/log');

const minJamMasuk = time_absen.min_masuk;
const maxJamMasuk = time_absen.max_masuk;
const maxJamIjin = time_absen.max_ijin;
const maxJamTerlambat = time_absen.max_terlambat;


const absensPerson = async (data = []) => {
    if (data.length == 1) {
        // ["00000000001"]
        const key = data[0];
        const isPerson = await Persons.findOne({ where: { key } });
        if (isPerson === null) {
            return { status: false, message: `key person tidak di temukan`, data: null };
        } else {
            const timenow = getTime.timeNow();
            const splitTimeNow = timenow.split(" ");
            if (splitTimeNow[1] <= minJamMasuk) {
                return { status: false, message: `mohon absen person di atas jam ${minJamMasuk} dan di bawah jam ${maxJamMasuk}`, data: null };
            } else {
                const isFoundToday = await Absens.findOne({
                    where: {
                        key,
                        created_at: {
                            [Op.substring]: splitTimeNow[0]
                        }
                    }
                });

                if (isFoundToday === null) {
                    let status;
                    if (splitTimeNow[1] >= maxJamMasuk) {
                        status = splitTimeNow[1] >= maxJamTerlambat ? "alpha" : "terlambat";
                    } else {
                        status = "masuk";
                    }

                    await Absens.create({ key: isPerson.key, status, message: status, created_at: timenow });
                    const statusAbsen = JSON.parse(isPerson.status_absen);
                    statusAbsen[status] += 1;
                    await Persons.update({ status_absen: statusAbsen }, { where: { key } });
                    return { status: true, message: `berhasil absen person dengan status ${status}`, data: isPerson };
                } else {
                    return { status: false, message: "data absen sudah ada untuk hari ini", data: isPerson };
                }
            }
        }
    } else if (data.length == 3) {
        // ["0x192u391289381928392", "00000000001", "keperluan mendadak"]
        const [personResponsible, person, message] = data;
        const isPersonResponsible = await PersonsRp.findOne({ where: { key: personResponsible } });
        const isPerson = await Persons.findOne({ where: { key: person } });

        if (isPersonResponsible === null) {
            return { status: false, message: `key person responsible tidak di temukan`, data: null };
        } else if (isPerson === null) {
            return { status: false, message: `key person tidak di temukan`, data: null };
        } else {
            if (isPersonResponsible.class == isPerson.class) {
                const timenow = getTime.timeNow();
                const splitTimeNow = timenow.split(" ");
                if (splitTimeNow[1] <= minJamMasuk) {
                    return { status: false, message: `mohon absen person di atas jam ${minJamMasuk} dan di bawah jam ${maxJamMasuk}`, data: null };
                } else {
                    const isFoundToday = await Absens.findOne({
                        where: {
                            key: person,
                            created_at: {
                                [Op.substring]: splitTimeNow[0]
                            }
                        }
                    });

                    if (isFoundToday === null) {
                        if (splitTimeNow[1] >= maxJamIjin) {
                            return {
                                status: false,
                                message: "ijin di tolak karena melewati batas maximal jam ijin",
                                data: null
                            };
                        } else {
                            await Absens.create({ key: isPerson.key, status: "ijin", message, created_at: timenow });
                            const statusAbsen = JSON.parse(isPerson.status_absen);
                            statusAbsen.ijin += 1;
                            await Persons.update({ status_absen: statusAbsen }, { where: { key: person } });
                            return {
                                status: true,
                                message: `berhasil absen person dengan status ijin`,
                                data: isPerson
                            };
                        }
                    } else {
                        return { status: false, message: "data absen sudah ada untuk hari ini", data: null };
                    }
                }
            } else {
                return { status: false, message: "key person responsible dengan person berbeda kelas", data: null };
            }
        }
    } else {
        return { status: false, message: "format qr tidak valid", data: null };
    }
};

const intervalCheckForAlphaStatus = () => {
    if (cluster.worker.id == "1") {
        log.info("[worker: 1] running cron database for write status alpha");
        const scheduleTime = "*/5 * * * *"; // 5 minutes
        nodecron.schedule(scheduleTime, async () => {
            try {
                const timenow = getTime.timeNow();
                const splitTimeNow = timenow.split(" ");
                const findData = await Cron.findOne({
                    where: {
                        created_at: {
                            [Op.substring]: splitTimeNow[0]
                        }
                    }
                });

                if (findData === null) {
                    await Cron.create({ status: "waiting", count_create: 0, created_at: timenow, updated_at: timenow });
                } else {
                    if (findData.status == "waiting") {
                        if (splitTimeNow[1] >= maxJamTerlambat) {
                            let lengthBulkCreate = 0;
                            let absensBulkCreate = [];
                            let personBulkCreate = [];
                            const getAllDataPerson = await Persons.findAll();
                            const lengthGetAllDataPerson = getAllDataPerson.length;

                            for (let index = 0; index < lengthGetAllDataPerson; index++) {
                                const it = getAllDataPerson[index];
                                const { key, no, name, status_absen } = it;
                                const findOneData = await Absens.findOne({
                                    where: {
                                        key,
                                        created_at: {
                                            [Op.substring]: splitTimeNow[0]
                                        }
                                    }
                                });

                                if (findOneData === null) {
                                    lengthBulkCreate += 1;

                                    absensBulkCreate.push({ key, status: "alpha", message: "alpha", created_at: getTime.timeNow() });

                                    const jsonParse = JSON.parse(status_absen);
                                    jsonParse.alpha += 1;
                                    personBulkCreate.push({ key, class: it.class, no, name, status_absen: JSON.stringify(jsonParse) });
                                }

                                if ((index + 1) == lengthGetAllDataPerson) {
                                    await Absens.bulkCreate(absensBulkCreate);
                                    await Persons.bulkCreate(personBulkCreate, { updateOnDuplicate: ["status_absen"] });
                                    await Cron.update({ status: "done", count_create: lengthBulkCreate, updated_at: getTime.timeNow() }, { where: { id: findData.id } });
                                    log.info("success sync cron database for write status alpha");
                                }
                            }
                        }
                    }
                }
            } catch (err) {
                log.error("intervalCheckForAlphaStatus, info: " + err);
            }

            // console.log("helloworld:", getTime.timeNow());
        });
    }
};

const isValidAccessKey = async (type = "", key = "") => {
    const findOneData = await AccessKey.findOne({ where: { type, key } });
    return findOneData === null ? false : true;
};

module.exports = Object.assign(sequelize, {
    absensPerson,
    isValidAccessKey,
    intervalCheckForAlphaStatus
});