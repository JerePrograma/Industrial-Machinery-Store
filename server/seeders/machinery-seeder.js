const Machinery = require('../models/Machinery');

const seedMachinery = async () => {
  try {
    console.log('🌱 Iniciando seeder de maquinaria...');

    if (!Machinery) {
      throw new Error('❌ El modelo Machinery no está disponible');
    }

    await Machinery.destroy({ 
      where: {},
      truncate: true,
      cascade: true 
    });
    console.log('🧹 Datos anteriores eliminados');

    const machineryData = [
      {
        name: 'TALADRO FRESADOR HELLER TF-150',
        brand: 'Heller',
        category: 'Metalmecánica',
        subCategory: 'Taladro fresador/Taladro radial',
        price: 0,
        condition: 'new',
        description: 'CON MORDAZA (NUEVO) COMPLETO',
        imageUrl: '/src/assets/real-machines/taladro_fresadora_helfer.jpg',
        isOffer: false
      },
          {
            name: 'FRESADORA UNIVERSAL MARCA FOLLOW',
            brand: 'Follow',
            category: 'Metalmecánica',
            subCategory: 'Fresadoras',
            price: 0,
            condition: 'used',
            description: 'MOD:FU1250,\nMESA GIRATORIA DE 1250X320 MM,\nGIRO DE LA MESA 35°,\nRECORRIDO LONGUITUDINAL 1000MM,\nTRANSVERSAL 280 MM, VERTICAL 450MM,\nCABEZAL UNIVERSAL VERTICAL ISO 40MM,\nDISTANCIA MIN - MAX DE CABEZAL A LA MESA 250-660MM, MOTOR 220-400 VOLTIOS 50/60',
            imageUrl: '/src/assets/real-machines/fresadora_follow.jpg',
            isOffer: false
          },
          {
            name: 'CIZALLA ELECTROMECANICA M, CASANOVA MOD. MC-0',
            brand: 'Casanova',
            category: 'Metalmecánica',
            subCategory: 'Cizallas',
            price: 0,
            condition: 'used',
            description: 'DE 2000 X 4MM CON BRAZOS LATERALES',
            imageUrl: '/src/assets/real-machines/cizalla.jpg',
            isOffer: true
          },
        ];

    const createdMachinery = await Machinery.bulkCreate(machineryData);
    console.log(`✅ ${createdMachinery.length} maquinarias creadas exitosamente`);

    // Mostrar estadísticas
    const stats = await Promise.all([
      Machinery.count({ where: { condition: 'new', isOffer: false } }),
      Machinery.count({ where: { condition: 'used', isOffer: false } }),
      Machinery.count({ where: { isOffer: true } })
    ]);

    console.log('\n📊 Estadísticas de datos creados:');
    console.log(`   • Maquinaria nueva: ${stats[0]} registros`);
    console.log(`   • Maquinaria usada: ${stats[1]} registros`);
    console.log(`   • Ofertas especiales: ${stats[2]} registros`);
    console.log(`   • Total: ${stats[0] + stats[1] + stats[2]} registros`);
    console.log('🎉 Seeder completado exitosamente');

    return createdMachinery;
  } catch (error) {
    console.error('❌ Error ejecutando seeder:', error.message);
    throw error;
  }
};

module.exports = { seedMachinery };