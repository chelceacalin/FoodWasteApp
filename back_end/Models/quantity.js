const sequelize = require("../db/index");
const { DataTypes } = require("sequelize");

const Quantity = sequelize.define('quantities', {
    id: {
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
    }
})

module.exports = Quantity;