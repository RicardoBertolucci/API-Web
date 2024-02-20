'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Telephone', {
      ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      IDCONTACT: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Contact', key: 'ID' }
      },
      NUMBER: {
        type: Sequelize.STRING(16),
        allowNull: false,
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
    await queryInterface.dropTable('Telephone');
  }
};