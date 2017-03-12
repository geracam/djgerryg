/**
 * Messenger API Library handles calls to the Messenger API for interacting with our chatbot
 *
 * @author GG
 */

let Api = require('../api');
let env = require('dotenv').config();

var MessengerApi = {
    baseUri : 'https://graph.facebook.com/v2.6/me/messages'
};

MessengerApi.callSendApi = function(messageData) {
    var postParams = {
        uri: MessengerApi.baseUri,
        qs: { access_token: process.env.FB_ACCESS_TOKEN},
        method: 'POST',
        json: messageData
    };
    Api.post(postParams);
}

module.exports = MessengerApi;
