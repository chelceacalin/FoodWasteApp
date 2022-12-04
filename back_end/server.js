import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

var corsOptions = {
    origin: 'http//localhost:8081'
}

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log('Started on port:' + port);
})