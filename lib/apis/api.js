/**
 * Main API library handles making HTTP calls
 */

let request = require('request');
let env = require('dotenv').config();

var Api = {};

/**
 * Performs a GET call
 *
 * @author GG
 *
 * @param string    uri           Route to make the POST call to
 * @param string    params        Payload to send with POST call
 * @param function  callback      Optional callback function to execute on success
 *
 * @see https://www.npmjs.com/package/request#requestoptions-callback
 */
Api.get = function(uri, params = {}, callback = NULL) {
    request({
        uri: uri,
        qs: params,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            if (callback) {
                callback(response.body);
            }
            return response.statusCode;
        } else {
            console.log(`Error ${error} with code ${response.statusCode}`);
        }
    });
}

/**
 * Performs a POST call
 *
 * @author GG
 *
 * @param string    uri           Route to make the POST call to
 * @param string    headers       Headers to set on the POST call (i.e. Auth)
 * @param string    params        Payload to send with POST call
 * @param function  callback      Optional callback function to execute on success
 *
 * @see https://www.npmjs.com/package/request#requestoptions-callback
 */
Api.post = function(uri, headers, params, callback = NULL) {
    request({
        uri: uri,
        qs: headers,
        method: 'POST',
        json: params
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            if (callback) {
                callback(response.body);
            }
            return response.statusCode;
        } else {
            console.log(`Error ${error} with code ${response.statusCode}`);
        }
    });
}
