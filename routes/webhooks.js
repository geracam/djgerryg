/**
 * Routes that handle direct Facebook Messenger webhook calls
 */

// Controller
let facebookController = require('../Controllers/FacebookController');

// Middleware
let fbAuth = require('../middleware/fbauth');

module.exports = function(app) {
    app.get("/webhook", fbAuth, function(request, response) {
        facebookController.getSuccessfulFbAuth(request, response);
    });
}
