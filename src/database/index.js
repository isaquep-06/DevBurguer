import { Sequelize } from 'sequelize';
import mongoose from 'mongoose';
import databaseConfig from '../config/database.cjs';

import User from '../app/models/User.js';
import Product from '../app/models/Product.js';
import Category from '../app/models/Category.js';

const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  async init() {
    try {
      this.connection = new Sequelize(databaseConfig);

      await this.connection.authenticate();

      console.log("Banco PostgreSQL conectado! 🚀");

      models
        .map((model) => model.init(this.connection))
        .map(
          (model) =>
            model.associate && model.associate(this.connection.models),
        );

    } catch (error) {
      console.error("Erro ao conectar no PostgreSQL:", error);
    }
  }

  async mongo() {
    try {
      await mongoose.connect('mongodb://localhost:27017/devburguer');

      console.log("MongoDB conectado! 🍃");

    } catch (error) {
      console.error("Erro ao conectar no MongoDB:", error);
    }
  }
}

export default new Database();