const {Model,DataTypes} = require('sequelize');
const { UPSERT } = require('sequelize/types/lib/query-types');

const sequelize = require('../config/connection');

class User extends Models {}

User.init(
  {
    
  //  define an id column
  id:{
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement :true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
    isEmail : true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      len:[4]
    }
  }
},
  {
    // TABLE CONFIGURATION OPTION GO HERE

    // PASS IN OUR IMPORT SEQUELIZE CONNECTION
    sequelize,
    // DON'T AUTO CREATE TIMESTRAP FIELD
    timestamps: false,
    // DON'T PLURALIZE NAME OF DATABASE TABLE
    freezeTableName: true,
    // USE UNDERSCORE INTEAD OF CAMEL-CASING
    underscored: true,
    // MAKE IT SO OUR MODEL NAME STAYS LOWERCASE IN THE DATABASE
    modelName: 'user'

  }
);

module.exports = User;