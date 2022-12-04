const sequelize = require("../db/index");
const { DataTypes } = require("sequelize");

const Reservation = sequelize.define("reservations", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    receiverId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
})

module.exports = Reservation;