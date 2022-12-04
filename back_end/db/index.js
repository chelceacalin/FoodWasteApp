import { Sequelize, DataType } from 'sequelize';
import config from '../db/config.js';
import User from '../Models/user.js';
import Product from '../Models/product.js';
import Quantity from '../Models/quanity.js';
import Reservation from '../Models/reservation.js';

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect
})

User.hasMany(Product);
Product.belongsTo(User, { foreignKey: "idUser" });
Product.hasOne(Quantity, { foreignKey: 'quantityId' });
Reservation.hasOne(Product, { foreignKey: 'productId' });
User.hasMany(Reservation);
Reservation.belongsTo(User, { foreignKey: 'receiverId' });

sequelize.authenticate().then((res) => {
    console.log("Autentificat");
    sequelize.sync({ force: true })
        .then((res) => { console.log("Synced"); })
        .catch((err) => { console.log("Sync failed") });

}).catch((err) => {
    console.log(err.message);
})

export default sequelize;