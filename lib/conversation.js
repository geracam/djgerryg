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
                Conversation.querySong(senderId, messageText);
        }
    }
}

Conversation.querySong = function(recipientId, messageText) {
    messengerApi.querySpotify(messageText, function(songDetails) {
        console.log(songDetails);
    })
}

Conversation.receivedPostback = function(event) {
    var senderId = event.sender.id;
    var recipientId = event.recipient.id;
    var timeOfPostback = event.timestamp;

    messengerApi.getUserParams(senderId, function(user) {
        let message = `Welcome ${user.first_name}! Let me know the name of a song, and I can tell you who made it.`;
        Conversation.sendTextMessage(senderId, message);
    });
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
