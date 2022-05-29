/*
* Server backend for OurCanvas
*
* think of this as the main.js for our server.
* initializes and loads everything in the backend and is the main process.
*
* Devs: lvlonEmperor and Wasee Alam
* Date: 2022-05-26
*/

const express = require('express');
const bodyParser = require('body-parser');

// initialize our express app
const app = express();
let port = 5000; // the port we are using
const tile = require('./routes/tile'); // Import routes for tiles

// sets up the mongoose connection
const mongoose = require('mongoose')
const Process = require("process");
require('dotenv').config() // loads the dotenv file


// connects to mongodb
const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.g5byo.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(uri)
mongoose.Promise = global.Promise
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))



// body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))



// the routes we use for tiles. this gives us the url: https://localhost:port/tiles
app.use('/tiles', tile)

app.listen(port, () => { // listens on the port
    console.log('Server is up and running on port number ' + port);
});