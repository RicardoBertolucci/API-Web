'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    static associate(models) {
      Contact.hasMany(models.Telephone, {foreignKey: "ID"})
    }
  }
  Contact.init({
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true 
    },
    NOME: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    IDADE: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Contact',
    tableName: 'Contact',
    timestamps: true,
    createdAt: "CREATEAT", 
    updatedAt: "UPDATEAT",
  });
  return Contact;
};