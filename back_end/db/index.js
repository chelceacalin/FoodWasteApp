const config = require('../db/config');
const { Sequelize, DataTypes } = require('sequelize');
//const User = require('../Models/user');

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect
})
sequelize.authenticate().then((res) => {
    console.log("Autentificat");
    sequelize.sync({ force: true })
        .then((res) => { console.log("Synced"); })
        .catch((err) => { console.log("Sync failed") });

}).catch((err) => {
    console.log("Error");
})

module.exports = sequelize;













// User.hasMany(Product);
// Product.belongsTo(User, { foreignKey: "idUser" });
// Product.hasOne(Quantity, { foreignKey: 'quantityId' });
// Reservation.hasOne(Product, { foreignKey: 'productId' });
// User.hasMany(Reservation);
// Reservation.belongsTo(User, { foreignKey: 'receiverId' });