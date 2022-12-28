const sequelize = require("../db/index");
const { DataTypes } = require("sequelize");

const newUserSub = sequelize.define('newUserSubs', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    sub: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = newUserSub;