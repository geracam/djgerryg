/**
 * Messenger API Library handles calls to the Messenger API for interacting with our chatbot
 *
 * @author GG
 */

let request = require('request');
let env = require('dotenv').config();

var MessengerApi = {};

MessengerApi.callSendApi = function(messageData) {
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: process.env.FB_ACCESS_TOKEN},
        method: 'POST',
        json: messageData
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("yay!");
        } else {
            console.log(error);
            console.log(body);
            console.log("no :(");
        }
    })
}

MessengerApi.getUserParams = function(senderId, callback) {
    request({
        uri: `https://graph.facebook.com/v2.6/${senderId}/?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=${process.env.FB_ACCESS_TOKEN}`,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(body);
        } else {
            console.log(error);
            console.log(body);
            console.log("no :(");
        }
    })
}

MessengerApi.querySpotify = function(search, resolve, callback) {
    request({
        uri: `https://api.spotify.com/v1/search`,
        qs: {
            q : search,
            type: 'track'
        },
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(resolve, body);
        } else {
            console.log(error);
        }
    })
}

module.exports = MessengerApi;
