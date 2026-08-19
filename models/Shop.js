const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Shop = sequelize.define('Shop', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  info: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  loginToken: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'login_token'
  }
}, {
  timestamps: true,
  tableName: 'shops'
});

module.exports = Shop;
