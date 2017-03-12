let conversationLib = require('../lib/conversation');

var FacebookController = {
    getSuccessfulFbAuth : (response, request) => response.status(200).send(request.query['hub.challenge']),
}

FacebookController.getConversationStart = function(request, response) {
    var data = request.body;

    // Object must be a page subscription
    if (data.object === 'page') {
        data.entry.foreach(function (entry) {
            var pageId = entry.id;
            var timeOfEvent = entry.time;

            entry.messaging.forEach(function (event) {
                if (event.message) {
                    conversationLib.receivedMessage(event);
                } else {
                    console.log(`Webhook received for unknown event: ${event}`);
                }
            });
        });
    }
    response.sendStatus(200);
}

module.exports = FacebookController;
