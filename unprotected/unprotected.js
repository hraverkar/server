module.exports = function (sequelize, config, app, Sequelize, jwt, jwtOptions) {
  const unprotectedRouter = require("express").Router();
  // unprotected routes field:
  const register = require("./register")(sequelize, config, app, Sequelize);
  unprotectedRouter.use("/register", register);

  // unprotected routes field:
  const login = require("./login")(
    sequelize, config, app, Sequelize,jwt, jwtOptions
  );
  unprotectedRouter.use("/login", login);

  return unprotectedRouter;
};
