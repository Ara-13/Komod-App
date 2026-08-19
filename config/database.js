const { Sequelize } = require('sequelize');
require('dotenv').config();

const dialect = process.env.DB_DIALECT || 'sqlite';

let sequelize;

if (dialect === 'sqlite') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_STORAGE || './database.sqlite',
    logging: false, // Set to console.log to see SQL queries in console
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME || 'komod',
    process.env.DB_USER || 'root',
    process.env.DB_PASS || '',
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: dialect,
      logging: false,
    }
  );
}

module.exports = sequelize;
