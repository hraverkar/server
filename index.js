var express = require("express");
var app = express();
var sql = require("mssql");
var http = require("http");
var Config = require("./config");
const Sequelize = require("sequelize");

app.use(
  express.urlencoded({
    extended: true,
    limit: "5mb",
  })
);
app.use(express.json({ limit: "5mb" }));

// Option 1: Passing parameters separately
const sequelize = new Sequelize(Config.database, Config.user, Config.password, {
  host: Config.server,
  dialect: "mssql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

  const dbroutes = require("./databaseRoutes")(
    sequelize,
    Config,
    app,
    Sequelize
  );
  app.use(dbroutes);

// sql.connect(Config.sqlConfig, function (err) {
//     if (err) console.log(err);
//     // create Request object
//     var request = new sql.Request();
//     // query to the database and get the records
//     request.query('select * from Test', function (err, recordset) {
//         if (err) console.log(err)
//         // send records as a response
//         console.log(recordset);
//     });
// });

app.disable("x-powered-by");
let currentServer;
currentServer = http.createServer(app).listen(Config.unsecureport, function () {
  process.send && process.send("ready");
  console.log(Config.unsecureport);
});
