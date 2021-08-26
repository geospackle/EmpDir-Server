/* eslint-disable no-console */

const Sequelize = require("sequelize");
require("dotenv").config();
const { DataTypes } = Sequelize;

const dbConnectURL = process.env.DB_CONNECT_URL;

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
