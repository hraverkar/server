module.exports = function (sequelize) {
  const Sequelize = require("sequelize");
  var bookingdataModel = sequelize.define(
    "booking",
    {
      bookingid: { type: Sequelize.INTEGER, primaryKey: true },
      userid: Sequelize.STRING,
      propertyid: Sequelize.STRING,
      bookingperioddate: Sequelize.DATEONLY,
      bookingtime: Sequelize.DATE,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    },
    { timestamps: false, freezeTableName: true }
  );
  return bookingdataModel;
};
