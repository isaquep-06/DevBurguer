'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('categories', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        // Product name
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      created_at: {
        // Criation data
        type: Sequelize.DATE(),
        allowNull: false,
      },
      updated_at: {
        // Update data
        type: Sequelize.DATE(),
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('categories');
  },
};
