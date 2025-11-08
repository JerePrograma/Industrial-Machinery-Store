const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'industrial_machinery_store',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'gabriel1899',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
  }
);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Base de datos conectada correctamente');
    
    // Sincronizar modelos (crear tablas si no existen)
    await sequelize.sync({ alter: true });
    console.log('✅ Modelos sincronizados');
  } catch (error) {
    console.error('❌ Error conectando a la base de datos:', error);
  }
};

module.exports = { sequelize, connectToDatabase };