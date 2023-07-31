const dayjs = require('dayjs');
const path = require('path');
const utc = require('dayjs/plugin/utc');
const tz = require('dayjs/plugin/timezone');
const { time_zone } = require(path.join(process.cwd(), "config", "config.json"));

dayjs.extend(utc);
dayjs.extend(tz);

const zone = time_zone; // dayjs.tz.guess();
module.exports = {
    timeNow: () => dayjs.utc().tz(zone).format("YYYY-MM-DD HH:mm:ss"),
    timeNowWithAdd: (value = "", unit = "") => dayjs.utc().add(value, unit).tz(zone).format("YYYY-MM-DD HH:mm:ss")
}
// module.exports = () => dayjs.utc().tz(zone).format("YYYY-MM-DD HH:mm:ss:SSS");