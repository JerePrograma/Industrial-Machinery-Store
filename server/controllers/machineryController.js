const Machinery = require('../models/Machinery');

// Obtener maquinaria nueva
exports.getNewMachinery = async (req, res) => {
    try {
        const machinery = await Machinery.findAll({ 
            where: { condition: 'new' } 
        });
        res.status(200).json(machinery);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching new machinery', error: error.message });
    }
};

// Obtener maquinaria usada
exports.getUsedMachinery = async (req, res) => {
    try {
        const machinery = await Machinery.findAll({ 
            where: { condition: 'used' } 
        });
        res.status(200).json(machinery);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching used machinery', error: error.message });
    }
};

// Obtener ofertas
exports.getOffers = async (req, res) => {
    try {
        const machinery = await Machinery.findAll({ 
            where: { isOffer: true } 
        });
        res.status(200).json(machinery);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching offers', error: error.message });
    }
};

// Filtrar maquinaria
exports.filterMachinery = async (req, res) => {
    const { category, brand, condition, subCategory } = req.query;
    try {
        const whereClause = {};
        if (category) whereClause.category = category;
        if (brand) whereClause.brand = brand;
        if (condition) whereClause.condition = condition;
        if (subCategory) whereClause.subCategory = subCategory;

        const machinery = await Machinery.findAll({ where: whereClause });
        res.status(200).json(machinery);
    } catch (error) {
        res.status(500).json({ message: 'Error filtering machinery', error: error.message });
    }
};

// Obtener maquinaria por ID
exports.getMachineryById = async (req, res) => {
    try {
        const machinery = await Machinery.findByPk(req.params.id);
        if (!machinery) {
            return res.status(404).json({ message: 'Machinery not found' });
        }
        res.status(200).json(machinery);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching machinery', error: error.message });
    }
};

