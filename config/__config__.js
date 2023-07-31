module.exports = {
    webserver_port: "3000", // port url website, example = "3000"
    app_name: "INSTITUT OF BANDUNG", // name application website, example = "UNIVERSITY HARVARD"
    time_zone: "Asia/Jakarta", // zone time, example = "Asia/Jakarta"
    time_absen: {
        min_masuk: "05:00", // kurang dari ini system tidak berfungsi
        max_masuk: "09:00", // lewat dari ini status akan terlambat (T)
        max_ijin: "23:00", // lewat dari ini ijin akan di tolak
        max_terlambat: "23:00", // lewat dari ini status akan alpha (A). lewat dari ini script akan mengsyncron dan jika tidak ada data person untuk hari ini di table `absens` maka system akan melakukan write ke database dengan status alpha
    },
    database_settings: {
        host: "127.0.0.1", // example = "127.0.0.1"
        port: "3306", // example = "3306"
        database: "db_absens", // example = "db_absens"
        username: "root", // example = "root"
        password: "",  // example = "admin"
        logging: true,  // example = true or false
        dialect: "mariadb", // example = mysql or mariadb
        pool: {
            max: 50,
            min: 0,
            idle: 5000
        },
        dialectOptions: {
            connectTimeout: 1000
        }
    }
};