import express from 'express';
const app = express();
const port = 3000;

app.get('/api', (req, res) => {
    res.send('Hello2!');
})

app.listen(port, () => {
    console.log('Started on port:' + port);
})