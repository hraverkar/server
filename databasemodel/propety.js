module.exports = function (sequelize) {
    const Sequelize = require("sequelize");
    var propertydataModel = sequelize.define(
      "property",
      {
        propertyid: { type: Sequelize.STRING, primaryKey: true },
        propertyname: Sequelize.STRING,
        location: Sequelize.STRING,
        city: Sequelize.STRING,
        isactive: Sequelize.STRING,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
        long_lat: Sequelize.STRING,
      },
      { timestamps: false, freezeTableName: true }
    );
    return propertydataModel;
  };
  