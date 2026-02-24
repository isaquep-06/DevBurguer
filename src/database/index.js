// Imports configs
import { Sequelize } from 'sequelize';
import mongoose from 'mongoose';
import databaseConfig from '../config/database.cjs';
// Controllers
import User from '../app/models/User.js';
import Product from '../app/models/Product.js';
import Category from '../app/models/Category.js';

// Lista das Models..
const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }
  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (models) =>
          models.associate && models.associate(this.connection.models),
      );

    console.log("Conexão feita! 🚀🔥")
  }

  mongo() {
    this.connectionMongo = mongoose.connect(
      'mongodb://localhost:27017/devburguer',);
  }
}

export default new Database(); // Exportando já estanciada!
