/**
 * DJ Gerry G is a chatbot application that will
 * interact with you and serve you personalized music
 * recommendations and news.
 *
 * @author GG
 * @see https://github.com/geracam/djgerryg
**/

// Declare dependencies
let express = require('express');
let bodyParser = require('body-parser');
let config = require('config');
let morgan = require('morgan');
let crypto = require('crypto');
let request = require('request');
let https = require('https');
let env = require('dotenv').config();

let app = express();

// PORT delcaration
let port = process.env.PORT || 3000;

// Validation variables
const MESSENGER_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;

// Define middleware. NOTE: Order matters in middleware
// @see https://expressjs.com/en/api.html#app.use
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.text());

app.use(bodyParser.json({
    type: 'application/json'
}));

// Load routes
require('./routes/webhooks')(app);

// Root route
app.get("/", (request, response) => response.status(200).json({
    message: "I'm DJ Gerry G!"
}));

app.listen(port);
console.log(`App listening on port ${port}`);

module.exports = app;
