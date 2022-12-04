const express = require('express');
const cors = require('cors');
const app = express();


//Middleware 
var corsOptions = {
    origin: 'http//localhost:8081'
}
let port = 3030;
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = require('./routes/productRoutes');
app.use('/api/products', router);


app.listen(port, () => {
    console.log('Started on port:' + port);

})