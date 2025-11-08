const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Machinery = sequelize.define('Machinery', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    category: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    subCategory: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    condition: {
        type: DataTypes.ENUM('new', 'used'),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    imageUrl: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    isOffer: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'Machineries',
    timestamps: true
});

module.exports = Machinery;