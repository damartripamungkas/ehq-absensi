const { isMaster } = require('cluster');
const logger = require('./utils/logger/log');
const { printTable } = require('console-table-printer');
const { name, author, version, url, author_instagram } = require('../../package.json');

if (isMaster === true) {
    printTable([{ name, author, version }]);
    logger.info(`software repository: ${url}`);
    logger.info(`author instagram: ${author_instagram}`);
    logger.info("starting system process");
}

require("./app");