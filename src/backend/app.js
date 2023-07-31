const [fs, eta, path, cors] = [require('fs'), require('eta'), require('path'), require('cors')];
const cpus = require('os').cpus();
const cluster = require('cluster');
const express = require('express');
const rateLimit = require('express-rate-limit');
const packageJson = require('../../package.json');
const logger = require('./utils/logger/log');
const config = require(path.join(process.cwd(), "config", "config.json"));
const { intervalCheckForAlphaStatus } = require('./database/db');
const app = express();


const { app_name, webserver_port } = config;
const logo_app = fs.readFileSync(path.join(process.cwd(), "init", "logo.png"), "base64");
const pathFrontend = path.join(__dirname, "..", "frontend");

if (cluster.isMaster) {
    cpus.forEach(() => cluster.fork());
    cluster.on("exit", () => cluster.fork());
} else {
    app
        .engine("eta", eta.renderFile)
        .set("view engine", "eta")
        .set("views", path.join(pathFrontend, "views"))
        .use(cors())
        .use(express.json())
        // .use(express.urlencoded())
        .use(express.static(pathFrontend))
        .use("/", rateLimit({ windowMs: 10000, max: 500, standardHeaders: true, legacyHeaders: false }))
        .use("/api/login", rateLimit({ windowMs: 10000, max: 30, standardHeaders: true, legacyHeaders: false }))
        .use("/api/login", require('./routes/login'))
        .use("/api/absens", require("./routes/absens"))
        .use("/api/persons", require("./routes/persons"))
        .get("/", (req, res) => {
            const { version, author, name, url, author_url, author_instagram } = packageJson;
            res.render("index.eta", {
                app: {
                    title: `${name.replaceAll("-", " ").split(" ").map((it) => it.slice(0, 1).toUpperCase() + it.slice(1)).join(" ")} | v${version}`,
                    name: app_name,
                    logo: logo_app
                },
                scriptinfo: {
                    version, author, name, url, author_url, author_instagram
                }
            });
        })
        .listen(webserver_port, () => {
            logger.info(`[worker: ${cluster.worker.id}] webserver connected on port: ${webserver_port}`);
            intervalCheckForAlphaStatus();
        });
}