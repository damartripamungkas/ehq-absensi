const cluster = require('cluster');
const getTime = require('../time/time');
const loggingPretty = require('logging-pretty');
const getTimeNow = () => getTime.timeNow();
const log = loggingPretty();

// log.custom = (msg = "") => log.custom(`[worker: ${getWorkerId()}] ${msg}`);
// log.debug = (msg = "") => log.debug(`[worker: ${getWorkerId()}] ${msg}`);
// log.error = (msg = "") => log.error(`[worker: ${getWorkerId()}] ${msg}`);
// log.fatal = (msg = "") => log.fatal(`[worker: ${getWorkerId()}] ${msg}`);
// log.info = (msg = "") => log.info(`[worker: ${getWorkerId()}] ${msg}`);
// log.trace = (msg = "") => log.trace(`[worker: ${getWorkerId()}] ${msg}`);
// log.warn = (msg = "") => log.warn(`[worker: ${getWorkerId()}] ${msg}`);

module.exports = Object.assign(log, { getTimeNow });