'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Contact', {
      ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      NOME: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      IDADE: {
        type: Sequelize.INTEGER
      },
      CREATEAT: {
        allowNull: false,
        type: Sequelize.DATE
      },
      UPDATEAT: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Contact');
  }
};