module.exports = function (sequelize, config, app, Sequelize) {
  let databaseRoute = require("express").Router();
  let jwt = require("jsonwebtoken");
  let expJWT = require("express-jwt");
  let execFile = require("child_process").execFile;
  // JWT properties
  var passportJWT = require("passport-jwt");
  let ExtractJwt = passportJWT.ExtractJwt;

  let jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: "key",
  };

  // unprotected routejwt, jwtOptions, sequelize, config, loggerFunction, fs
  let unprotected = require("./unprotected/unprotected")(
    sequelize,
    config,
    app,
    Sequelize,
    jwt,
    jwtOptions
  );
  // protected route
  let protected = require("./protected/protected")(
    expJWT,
    app,
    jwt,
    jwtOptions,
    sequelize,
    config,
    execFile
  );

  databaseRoute.use("/unprotected", unprotected);
  databaseRoute.use("/protected", protected);

  return databaseRoute;
};
