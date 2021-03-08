module.exports = function (sequelize) {
  const Sequelize = require("sequelize");
  var propertyimagedataModel = sequelize.define(
    "propertyimage",
    {
      propertyimageid: { type: Sequelize.STRING, primaryKey: true },
      propertyid: Sequelize.STRING,
      imagepath: Sequelize.STRING,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      property_size: Sequelize.STRING,
    },
    { timestamps: false, freezeTableName: true }
  );
  return propertyimagedataModel;
};
