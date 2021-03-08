module.exports = function (sequelize) {
    const Sequelize = require("sequelize");
    var paidmodedataModel = sequelize.define(
      "paidmoode",
      {
        paidmodeid: { type: Sequelize.INTEGER, primaryKey: true },
        paidmodename: Sequelize.STRING,
      },
      { timestamps: false, freezeTableName: true }
    );
    return paidmodedataModel;
  };
  