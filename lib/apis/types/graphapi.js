
let Api = require('../api');
let env = require('dotenv').config();

var graphApi = {
    baseDomain : 'https://graph.facebook.com/v2.6'
};

graphApi.getUser = function(userId, callback) {
    var uri = `${graphApi.baseDomain}/${userId}/?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=${process.env.FB_ACCESS_TOKEN}`;
    Api.get(uri, callback);
}

module.exports = graphApi;
