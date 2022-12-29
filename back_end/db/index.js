const config = require('../db/config');
const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect
});

sequelize.query('SET FOREIGN_KEY_CHECKS = 0').then(() => {
    sequelize.authenticate().then((res) => {

        sequelize.sync({ force: true, alter: true })
            .then((res) => { console.log("Synced"); })
            .catch((err) => { console.log("Sync failed" + err) });

    }).catch((err) => {
        console.log("Error" + err);
    })
});




module.exports = sequelize;













// User.hasMany(Product);
// Product.belongsTo(User, { foreignKey: "idUser" });
// Product.hasOne(Quantity, { foreignKey: 'quantityId' });
// Reservation.hasOne(Product, { foreignKey: 'productId' });
// User.hasMany(Reservation);
// Reservation.belongsTo(User, { foreignKey: 'receiverId' });