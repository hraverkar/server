module.exports = function (sequelize) {
    const Sequelize = require("sequelize");
    var paymentdataModel = sequelize.define(
      "payment",
      {
        paymentid: { type: Sequelize.STRING, primaryKey: true },
        transectionid: Sequelize.STRING,
        bookingid: Sequelize.STRING,
        amount: Sequelize.INTEGER,
        paidvia: Sequelize.STRING,
        paiddatetime: Sequelize.DATE,
        paidmodeid: Sequelize.STRING
      },
      { timestamps: false, freezeTableName: true }
    );
    return paymentdataModel;
  };
  