let Api = require('../api');
let env = require('dotenv').config();

var spotifyApi = {
    baseDomain : 'https://api.spotify.com/v1/search'
};

spotifyApi.queryTrack = function(search, callback) {
    var uri = `${spotifyApi.baseDomain}`,
        params = {
            q : search,
            type: 'track',
            limit: 1
        };
    Api.get(uri, params, callback);
}

module.exports = spotifyApi;
