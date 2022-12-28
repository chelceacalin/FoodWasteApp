const express = require('express');
const cors = require('cors');
const app = express();

let port = 3030;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routers
const routerProducts = require('./routes/productRoutes');
const routerUsers = require('./routes/userRoutes');
const routerReservations = require('./routes/reservationRoutes');
const routerQuantities = require('./routes/quantityRoutes');
app.use('/api/products', routerProducts);
app.use('/api/users', routerUsers);
app.use('/api/reservations', routerReservations);
app.use('/api/quantities', routerQuantities);
app.listen(port, () => {
    console.log('Started on port:' + port);

})