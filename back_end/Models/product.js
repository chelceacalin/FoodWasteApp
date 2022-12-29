const sequelize = require("../db/index");
const { DataTypes } = require("sequelize");

const Product = sequelize.define("products", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idUser: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photoURL: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING
    },
    forTrade: {
        type: DataTypes.BOOLEAN
    },
    expDate: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    category: {
        type: DataTypes.STRING
    },
    quantity_id: {
        type: DataTypes.UUID
    }
})

module.exports = Product;