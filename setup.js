setInterval(() => { }, 1000);
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const packageJson = require('./package.json');
const { printTable } = require('console-table-printer');
const logger = require('./src/backend/utils/logger/log');
const createAndRenderPromptList = async (msg = "", list = [""]) => (await inquirer.prompt([{ type: 'list', name: 'data', message: msg, choices: list }])).data.replaceAll("//").replaceAll("\\");
const createAndRenderPromptInput = async (msg = "") => (await inquirer.prompt([{ type: 'input', name: 'data', message: msg }])).data.replaceAll("//").replaceAll("\\");
const createAndRenderPromptConfirm = async (msg = "") => (await inquirer.prompt([{ type: 'confirm', name: 'data', message: msg }])).data;

(async () => {
    printTable([{ name: `ehq-absensi`, author: packageJson.author, version: packageJson.version }]);
    const startMenu = await createAndRenderPromptConfirm("welcome, do you want to proceed to setup");
    if (startMenu === true) {
        const input1 = await createAndRenderPromptInput("set your application web name");
        const input2 = await createAndRenderPromptInput("set webserver port, example: 3000");
        const input3 = await createAndRenderPromptInput("set web timezone, example: Asia/Jakarta");
        const input4 = await createAndRenderPromptInput("set timeabsen minimal masuk, example: 05:00");
        const input5 = await createAndRenderPromptInput("set timeabsen maximal masuk, example: 07:00");
        const input6 = await createAndRenderPromptInput("set timeabsen maximal ijin, example: 07:00");
        const input7 = await createAndRenderPromptInput("set timeabsen maximal terlambat, example: 08:00");
        const input8 = await createAndRenderPromptInput("set database host, example: 127.0.0.1");
        const input9 = await createAndRenderPromptInput("set database port, example: 3306");
        const input10 = await createAndRenderPromptInput("set database name, example: db_absens");
        const input11 = await createAndRenderPromptInput("set database username, example: root");
        const input12 = await createAndRenderPromptInput("set database password, example: admin");
        const input13 = await createAndRenderPromptInput("set database dialect, example: mariadb or mysql");
        const input14 = await createAndRenderPromptInput("set database pool/max, example: 50");
        const input15 = await createAndRenderPromptInput("set database pool/min, example: 0");
        const input16 = await createAndRenderPromptInput("set database pool/idle, example: 10000");
        const input17 = await createAndRenderPromptConfirm("enable logging of every database query execution");
        const input18 = await createAndRenderPromptConfirm("have you put logo file in init folder with file name logo.png");
        if (input18 === false) {
            logger.error("failed to setup, info: make sure you put file logo.png in folder init");
            logger.error("will exit in 5 second");
            setTimeout(() => process.exit(), 5000);
        } else {
            const findFileLogo = fs.readdirSync(path.join(process.cwd(), "init")).find((it) => it == "logo.png");
            if (findFileLogo === undefined) {
                logger.error("failed to setup, info: make sure you put file logo.png in folder init");
                logger.error("will exit in 5 second");
                setTimeout(() => process.exit(), 5000);
            } else {
                const obj = {
                    "webserver_port": input2,
                    "app_name": input1,
                    "time_zone": input3,
                    "time_absen": {
                        "min_masuk": input4,
                        "max_masuk": input5,
                        "max_ijin": input6,
                        "max_terlambat": input7
                    },
                    "database_settings": {
                        "host": input8,
                        "port": input9,
                        "database": input10,
                        "username": input11,
                        "password": input12,
                        "logging": input17,
                        "dialect": input13,
                        "pool": {
                            "max": parseInt(input14),
                            "min": parseInt(input15),
                            "idle": parseInt(input16)
                        },
                        "dialectOptions": {
                            "connectTimeout": 1000
                        }
                    }
                };

                fs.writeFileSync(path.join(process.cwd(), "config", "config.json"), JSON.stringify(obj, null, 4));
                logger.info("setup is completed");
                logger.info("will exit in 5 second");
                setTimeout(() => process.exit(), 5000);
            }
        }
    } else {
        logger.info("will exit in 5 second");
        setTimeout(() => process.exit(), 5000);
    }
})();