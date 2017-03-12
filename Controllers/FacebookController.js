/**
 * Handles incoming requests from the messenger API
 *
 * @author GG
 */

let conversationLib = require('../lib/conversation');

var FacebookController = {
    /**
     * Required for Messenger API authentication.
     * @author GG
     *
     * @param Object request   Request object passed from middleware
     * @param Object response  Response object passed from middleware
     *
     * @return NULL
     * @see https://developers.facebook.com/docs/messenger-platform/guides/setup
     */
    getSuccessfulFbAuth : (response, request) => response.status(200).send(request.query['hub.challenge']),
}

/**
 * Handles routing for any incoming request from the user into the Messenger bot.
 *
 * @author GG
 *
 * @param Object request  Request object from Facebook POST
 * @param Object response Response object to return call
 *
 * @return NULL
 *
 */
FacebookController.postConversationStart = function(request, response) {
    var data = request.body;

    // Object must be a page subscription
    if (data.object === 'page') {
        data.entry.forEach(function (entry) {
            var pageId = entry.id;
            var timeOfEvent = entry.time;
            entry.messaging.forEach(function (event) {
                if (event.message) {
                    //Message event (i.e. user sending text)
                    conversationLib.receivedMessage(event);
                } else if (event.postback) {
                    //Postback event (i.e. action button clicked)
                    conversationLib.receivedPostback(event);
                } else {
                    console.log(`Webhook received for unknown event: ${event}`);
                }
            });
        });
    }
    // Important to send response back before timeout, or bot will die
    response.sendStatus(200);
}

module.exports = FacebookController;
