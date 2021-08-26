const { sequelizeConnection, Sequelize, DataTypes } = require("./index.js");

const employee = sequelizeConnection.define("employee", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(),
  },
  picture: {
    type: DataTypes.STRING(),
  },
  department: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
});

module.exports = employee;
