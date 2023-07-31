const express = require('express');
const { worker } = require('cluster');
const { Persons } = require('../database/db');
const logger = require('../utils/logger/log');
const router = express.Router();


router
    .get("/data/:unique_key", async (req, res) => {
        try {
            let getData = {};
            const uniqueKey = req.params.unique_key;
            if (uniqueKey == "all") {
                getData = await Persons.findAll();
            } else {
                getData = await Persons.findOne({ where: { key: uniqueKey } });
            }
            res.status(200).json(getData);
        } catch (err) {
            logger.fatal(`[worker: ${worker.id}] unhandleError ./src/backend/routes/persons.js /data/:unique_key : ${err}`);
            res.status(500).json({ message: "internal server error" });
        }
    })
    .get("/data/all/class/:class_person", async (req, res) => {
        try {
            const classPerson = req.params.class_person.toLowerCase() == "all" ? undefined : req.params.class_person || undefined;
            const queryDb = classPerson === undefined ? undefined : { where: { class: classPerson } };
            const getData = await Persons.findAll(queryDb);
            res.status(200).json(getData);
        } catch (err) {
            logger.fatal(`[worker: ${worker.id}] unhandleError ./src/backend/routes/persons.js /data/class/:class_person : ${err}`);
            res.status(500).json({ message: "internal server error" });
        }
    });

module.exports = router;