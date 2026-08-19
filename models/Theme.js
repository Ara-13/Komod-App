const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Theme = sequelize.define('Theme', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  suitableTypes: {
    type: DataTypes.JSON,
    allowNull: true,
    field: 'suitable_types',
    comment: 'List of suitable clothing types (e.g. shirt, pants)'
  }
}, {
  timestamps: true,
  tableName: 'themes'
});

module.exports = Theme;
