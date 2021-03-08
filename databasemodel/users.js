module.exports = function (sequelize) {
  const Sequelize = require("sequelize");
  var userdataModel = sequelize.define(
    "users",
    {
      userid: { type: Sequelize.STRING, primaryKey: true },
      username: Sequelize.STRING,
      firstname: Sequelize.STRING,
      lastname: Sequelize.STRING,
      email: Sequelize.STRING,
      contact: Sequelize.BIGINT,
      password: Sequelize.STRING,
      created_at: Sequelize.STRING,
      updated_at: Sequelize.STRING,
      isactive: Sequelize.STRING,
      usertypeid: Sequelize.STRING,
    },
    { timestamps: false, freezeTableName: true }
  );
  return userdataModel;
};
