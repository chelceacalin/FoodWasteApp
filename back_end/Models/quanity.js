import { DataTypes } from "sequelize";
import sequelize from "../db";

const Quantity = sequelize.define('Quantities', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
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

export default Quantity;