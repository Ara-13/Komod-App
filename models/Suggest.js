const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Suggest = sequelize.define('Suggest', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id'
    }
  },
  meetingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'meeting_id',
    references: {
      model: 'meetings',
      key: 'id'
    }
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5
    }
  },
  feedback: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'suggests'
});

module.exports = Suggest;
