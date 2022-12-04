import express from 'express';
import { Sequelize, Model, DataTypes } from 'sequelize';
const app = express();
const port = 3000;
const sequelize = new Sequelize(
    'fortw',
    'forTW',
    '1234abc!',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

const User = sequelize.define('Users', {
    username: DataTypes.STRING,
    name: DataTypes.DATE
})

sequelize.sync().then(async function () {
    console.log('Everything is synced')
});

sequelize.authenticate().then(() => {
    console.log('Conn established');
}).catch((err) => {
    console.log('Unable to connect to database:', err);
})

app.get('/api', (req, res) => {
    res.send('Created');
})

app.listen(port, () => {
    console.log('Started on port:' + port);
})