const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Clothes = sequelize.define('Clothes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  wearCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'wear_count'
  },
  suggestCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'suggest_count'
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id'
    }
  },
  shopId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'shop_id',
    references: {
      model: 'shops',
      key: 'id'
    }
  }
}, {
  timestamps: true,
  tableName: 'clothes',
  validate: {
    hasExactlyOneOwner() {
      if ((this.userId === null) === (this.shopId === null)) {
        throw new Error('A clothing item must belong to exactly one user OR one shop.');
      }
    }
  }
});

module.exports = Clothes;
