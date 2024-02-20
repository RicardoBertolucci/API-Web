'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Telephone extends Model {
    static associate(models) {
      // Telephone.hasMany(models.Contact, { foreignKey:"IDCONTACT" })
    }
  }
  Telephone.init({
    ID: DataTypes.INTEGER,
    NUMBER: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Telephone',
    timestamps: true,
    createdAt: "CREATEAT", 
    updatedAt: "UPDATEAT",
  });
  return Telephone;
};