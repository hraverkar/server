module.exports = function (sequelize) {
    const Sequelize = require("sequelize");
    var usertypedataModel = sequelize.define(
      "usertype",
      {
        usertypeid: { type: Sequelize.INTEGER, primaryKey: true },
        usertypename: Sequelize.STRING,
      },
      { timestamps: false, freezeTableName: true }
    );
    return usertypedataModel;
  };
  