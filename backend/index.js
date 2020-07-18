const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');
const users = require('./app/users');
const places = require('./app/places');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);
    app.use('/users', users);
    app.use('/places', places);
    app.listen(port)
};

run().catch(e => {
    console.error(e)
});