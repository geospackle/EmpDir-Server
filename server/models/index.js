/* eslint-disable no-console */
const Sequelize = require("sequelize");

const { DataTypes } = Sequelize;

const dbConnectURL =
  "postgres://kivjxxep:vjw9CCl60PRlbzz4pAxv_NTFQuk-5OsL@chunee.db.elephantsql.com/kivjxxep";

const sequelizeConnection = new Sequelize(dbConnectURL, {
  dialect: "postgres",
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 20000, // Error if connection takes more than 20 seconds
  },
});

sequelizeConnection
  .authenticate("")
  .then(() => {
    console.log("Database connected...");
    sequelizeConnection.sync({});
  })
  .catch((err) => {
    console.error(`Error connecting to db: ${err}`);
  });

const db = {
  sequelizeConnection,
  Sequelize,
  DataTypes,
};

module.exports = db;
