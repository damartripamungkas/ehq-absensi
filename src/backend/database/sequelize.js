const [path, log] = [require('path'), require('../utils/logger/log')];
const { Sequelize, Op } = require('sequelize');
const { host, port, database, username, password, logging, dialect, pool, dialectOptions } = require(path.join(process.cwd(), "config", "config.json")).database_settings;
const sequelize = new Sequelize(database, username, password,
    {
        host,
        port,
        logging: logging === true ? (str) => log.info(`database info: ${str}`) : logging,
        dialect,
        dialectOptions,
        pool,
        define: {
            freezeTableName: true,
            timestamps: false,
        }
    }
);

// Test the connection
sequelize
    .authenticate()
    .then(() => {
        log.info("connection to the database has been established successfully");
    })
    .catch((err) => {
        log.error("Unable to connect to the database: " + err);
    });


exports.Sequelize = sequelize;
exports.Op = Op;

exports.Absens = sequelize.define("absens", {
    id: {
        type: "INT(50)",
        primaryKey: true
    },
    key: {
        type: "VARCHAR(50)"
    },
    status: {
        type: "ENUM('masuk', 'terlambat', 'alpha', 'ijin')",
    },
    message: {
        type: "VARCHAR(100)",
    },
    created_at: {
        type: "VARCHAR(20)"
    }
});

exports.Cron = sequelize.define("cron", {
    id: {
        type: "INT(50)",
        primaryKey: true
    },
    status: {
        type: "ENUM('done', 'waiting')"
    },
    count_create: {
        type: "INT(50)"
    },
    created_at: {
        type: "VARCHAR(20)"
    },
    updated_at: {
        type: "VARCHAR(20)"
    }
});

exports.Persons = sequelize.define("persons", {
    key: {
        type: "VARCHAR(50)",
        primaryKey: true
    },
    no: {
        type: "INT(10)",
    },
    class: {
        type: "VARCHAR(20)",
    },
    name: {
        type: "VARCHAR(50)"
    },
    status_absen: {
        type: "JSON"
    }
});

exports.PersonsRp = sequelize.define("persons_rp", {
    key: {
        type: "VARCHAR(100)",
        primaryKey: true
    },
    class: {
        type: "VARCHAR(20)",
        unique: true
    }
});

exports.AccessKey = sequelize.define("access_key", {
    key: {
        type: "VARCHAR(100)",
        primaryKey: true
    },
    type: {
        type: "ENUM('main', 'admin')",
        unique: true
    }
});