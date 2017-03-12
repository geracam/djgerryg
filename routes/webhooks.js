/**
 * Routes that handle direct Facebook Messenger webhook calls
 * Messenger uses a GET to authenticate the application.
 * Messenger uses a POST to submit responses.
 *
 * @author GG
 * @see https://developers.facebook.com/docs/messenger-platform/webhook-reference
 */

// Controller
let facebookController = require('../Controllers/FacebookController');

// Middleware
let fbAuth = require('../middleware/fbauth');

module.exports = function(app) {
    app.get("/webhook", fbAuth, function(request, response) {
        facebookController.getSuccessfulFbAuth(request, response);
    });

    app.post("/webhook", function(request, response) {
        facebookController.postConversationStart(request, response);
    });
}
