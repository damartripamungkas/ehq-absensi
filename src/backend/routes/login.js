const path = require('path');
const { worker } = require('cluster');
const router = require('express').Router();
const logger = require('../utils/logger/log');
const { time_zone, time_absen } = require(path.join(process.cwd(), "config", "config.json"));
const { isValidAccessKey } = require('../database/db');


router
    .post("/", async (req, res) => {
        try {
            const { type, key } = req.body;
            const isValid = await isValidAccessKey(type, key);
            if (type == "main") {
                const ret = isValid === true ? { status: true, data: { time_zone, time_absen } } : { status: false };
                res.status(200).json(ret);
            } else if (type == "admin") {
                const ret = isValid === true ? { status: true, data: { time_zone, time_absen } } : { status: false };
                res.status(200).json(ret);
            } else {
                res.status(200).json({ message: "wrong value input" });
            }
        } catch (err) {
            logger.fatal(`[worker: ${worker.id}] unhandleError ./src/backend/routes/login.js / : ${err}`);
            res.status(500).json({ message: "internal server error" });
        }
    });

module.exports = router;