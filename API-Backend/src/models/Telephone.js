'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Telephone extends Model {
    static associate(models) {
      Telephone.belongsTo(models.Contact, { foreignKey:"IDCONTACT" })
    }
  }
  Telephone.init({
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true
    },
    NUMBER: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Telephone',
    tableName: 'Telephone',
    timestamps: true,
    createdAt: "CREATEAT", 
    updatedAt: "UPDATEAT",
  });
  return Telephone;
};