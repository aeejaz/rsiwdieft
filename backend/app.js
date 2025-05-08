const dotenv = require('dotenv');
dotenv.config(); // at top most so it config it first

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // for now we will allow everything for production we allow only necc

app.get('/', (req, res) => {
    res.send('Hello World');
});


module.exports = app;

