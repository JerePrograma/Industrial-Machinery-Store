const path = require('path');
const { connectToDatabase } = require('../config/database');

const runSeeder = async () => {
  try {
    console.log('🚀 Iniciando proceso de seeding...');
    
    // Conectar a la base de datos primero
    await connectToDatabase();
    console.log('✅ Conexión a base de datos establecida');
    
    // Importar el seeder después de conectar
    const { seedMachinery } = require('../seeders/machinery-seeder');
    
    console.log('🌱 Ejecutando seeder de maquinaria...');
    await seedMachinery();
    
    console.log('✅ Proceso completado exitosamente');
    console.log('🔗 Ahora puedes probar tu aplicación');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error ejecutando seeder:', error.message);
    console.error('Detalles del error:', error.stack);
    process.exit(1);
  }
};

runSeeder();