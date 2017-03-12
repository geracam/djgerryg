let request = require('request');
let env = require('dotenv').config();

var Api = {};

Api.callSendApi = function(messageData) {
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: process.env.FB_ACCESS_TOKEN},
        method: 'POST',
        json: messageData
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("yay!");
        } else {
            console.log("no :(");
        }
    })
}

module.exports = Api;
