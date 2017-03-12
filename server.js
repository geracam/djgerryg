/**
 * DJ Gerry G is a chatbot application that will
 * interact with you and serve you personalized music
 * recommendations and news.
 *
 * @author GG
 * @see https://github.com/geracam/djgerryg
**/

// Declare dependencies
let express = require ('express');
let app = express();
let bodyParser = require('body-parser');
let config = require('config');
let morgan = require('morgan');

// PORT delcaration
let port = 3000;

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

// Root route
app.get("/", (request, response) => response.json({
    message: "I'm DJ Gerry G!"
}));

app.listen(port);
console.log(`App listening on port ${port}`);

module.exports = app;
