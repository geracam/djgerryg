let messengerApi = require('./api');

var Conversation = {};

Conversation.receivedMessage = function(event) {
    console.log("in here");
    var senderId = event.sender.id;
    var recipientId = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;
    var messageId = message.id;
    var messageText = message.text;
    var messageAttachments = message.attachments;

    if (messageText) {
        switch (messageText) {
            case 'generic':
                sendGenericMessage(senderId);
                break;
            default:
                sendTextMessage(senderId, messageText);
        }
    }
}

Conversation.sendTextMessage = function(recipientId, messageText) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: messageText
        }
    };

    messengerApi.callSendApi(messageData);
}

module.exports = Conversation;
