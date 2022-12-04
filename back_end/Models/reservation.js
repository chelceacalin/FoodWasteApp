import { DataTypes } from "sequelize";
import sequelize from "../db";

const Reservation = sequelize.define("Reservations", {
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

export default Reservation;