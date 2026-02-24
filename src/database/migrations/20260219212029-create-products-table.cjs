'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER, // 1, 2, 3, 4...
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        // Product name
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        // product price
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      path: {
        // Product IMG
        type: Sequelize.STRING(),
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING(),
        allowNull: false,
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
    await queryInterface.dropTable('products');
  },
};
