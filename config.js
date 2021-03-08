var config = require("./config");
config.user = "sa";
config.password = "Admin12345!";
config.server = "SHUBHAM-SEN";
config.database = "doc_house";
config.port = 1433;
config.accessTokenTimeOut = "1"; // time out in hour

config.sqlConfig = {
  user: config.user,
  password: config.password,
  server: config.server,
  database: config.database,
  port: config.port,
};

config.unsecureport = 7272;

module.exports = config;
