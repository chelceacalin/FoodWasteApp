const { DataTypes } = require("sequelize");
const sequelize = require('../db/index')
const Quantity = sequelize.define('Quantities', {
    qty_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    units: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    identificator: {
        type: DataTypes.UUID
    }
})

module.exports = Quantity;