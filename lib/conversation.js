let messengerApi = require('./api');

var Conversation = {};

Conversation.receivedMessage = function(event) {
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
                Conversation.sendTextMessage(senderId, messageText);
        }
    }
}

Conversation.receivedPostback = function(event) {
    var senderId = event.sender.id;
    var recipientId = event.recipient.id;
    var timeOfPostback = event.timestamp;

    Conversation.sendTextMessage(senderId, 'Welcome to DJ Gerry G');
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
