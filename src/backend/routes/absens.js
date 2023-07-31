const express = require('express');
const { worker } = require('cluster');
const { Persons, Absens, isValidAccessKey, absensPerson } = require('../database/db');
const logger = require('../utils/logger/log');
const router = express.Router();


router
    .post("/", async (req, res) => {
        try {
            let ret = {};
            const { key_main, key_1, key_2, message, status } = req.body;
            if (status == "ijin") {
                ret = await absensPerson([key_1, key_2, message]); // { status: true, message: "berhasil absen persons dengan status ijin", data: { key: "", name: "" } }
            } else {
                const isValidToken = await isValidAccessKey("main", key_main);
                if (isValidToken === true) {
                    ret = await absensPerson([key_2]); // { status: true, message: "absen berhasil", data: { key: "", name: "" } };
                } else {
                    ret = { status: false, message: "access key main not valid", data: null };
                }
            }
            res.status(200).json(ret);
        } catch (err) {
            logger.fatal(`[worker: ${worker.id}] unhandleError ./src/backend/absens.js/ /absen : ${err}`);
            res.status(500).json({ message: "internal server error" });
        }
    })
    .get("/data/:unique_key", async (req, res) => {
        try {
            const uniqueKey = req.params.unique_key;
            const getAbsens = await Absens.findAll({ where: { key: uniqueKey } });
            const getPerson = await Persons.findOne({ where: { key: uniqueKey } });
            const getData = getAbsens.map((_it) => {
                it = _it.dataValues;
                const newObj = {
                    key: getPerson.key,
                    no: getPerson.no,
                    class: getPerson.class,
                    name: getPerson.name,
                    status: it.status,
                    created_at: it.created_at
                };
                return newObj;
            });
            res.status(200).json(getData);
        } catch (err) {
            logger.fatal(`[worker: ${worker.id}] unhandleError ./src/backend/routes/absens.js /data/:unique_key : ${err}`);
            res.status(500).json({ message: "internal server error" });
        }
    })
    .get("/data/all/class/:class_person", async (req, res) => {
        try {
            const classPerson = req.params.class_person.toLowerCase() == "all" ? undefined : req.params.class_person || undefined;
            const queryDb = classPerson === undefined ? undefined : { where: { class: classPerson } };
            const getAllPerson = await Persons.findAll(queryDb);
            const allPersonKey = getAllPerson.map((it) => it.key);
            const getAllAbsens = await Absens.findAll(queryDb === undefined ? queryDb : { where: { key: allPersonKey } });
            const mappingAllData = getAllAbsens.map((it) => {
                const getDataPerson = getAllPerson.find((it2) => it.key == it2.key);
                return {
                    id: it.id,
                    key: it.key,
                    no: getDataPerson.no, // `no: ${getDataPerson.no}`,
                    class: getDataPerson.class,
                    name: getDataPerson.name,
                    status: it.status,
                    message: it.status == "ijin" ? "private message" : it.message,
                    created_at: it.created_at
                };
            });

            res.status(200).json(mappingAllData);
        } catch (err) {
            logger.fatal(`[worker: ${worker.id}] unhandleError ./src/backend/routes/absens.js /data/all/class/:class_person : ${err}`);
            res.status(500).json({ message: "internal server error" });
        }
    });

module.exports = router;