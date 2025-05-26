const dotenv = require('dotenv');
dotenv.config(); // at top most so it config it first

const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes');

connectToDb();-

// this are middleware
app.use(cors()); // for now we will allow everything for production we allow only necc
app.use(express.json()); //Without it: req.body would be undefined for JSON requests, making it impossible to access the data.
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

// express.json():
// Parses the JSON payload { "username": "john", "password": "secret" }.  -> Populates req.body as { username: "john", password: "secret" }.
// express.urlencoded({ extended: true }):
// Parses the URL-encoded form data username=john&password=secret. _>Populates req.body as { username: "john", password: "secret" }.
// cookieParser():
// Parses the Cookie header session=abc123. ->Populates req.cookies as { session: "abc123" }.



app.get('/', (req, res) => {
    res.send('Hello everything looks perfect in getting  response and starting the server');
});

app.use('/users', userRoutes);

app.use('/captains', captainRoutes);

app.use('/maps', mapsRoutes);

module.exports = app;

