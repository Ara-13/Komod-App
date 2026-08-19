const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Meeting = sequelize.define('Meeting', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  themeId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'theme_id',
    references: {
      model: 'themes',
      key: 'id'
    }
  }
}, {
  timestamps: true,
  tableName: 'meetings'
});

module.exports = Meeting;
