 const sequelize = require("./index");
 // const Quantity = require('../Models/quantity.js');
 const Product = require('../Models/product')
 const Reservation = require('../Models/reservation');

 Product.hasOne(Reservation, {
     foreignKey: 'productId'
 }); // A HasOne B
 Reservation.belongsTo(Product);
 // Product.belongsTo(Quantity, {
 //     onDelete: 'SET NULL'
 // });
 // Quantity.hasOne(Product, {
 //     allowNull: false,

 // });

 const queryInterface = sequelize.getQueryInterface();