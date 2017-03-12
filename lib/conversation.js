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
                Conversation.querySong(senderId, messageText, function(songResponse) {
                    Conversation.sendSongTextMessage(senderId, songResponse);
                });
        }
    }
}

Conversation.sendSongTextMessage = function(senderId, songResponse) {
    var messageData = {
        recipient: {
            id: senderId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: [
                        {
                            title: `${songResponse.artists[0].name} ft. ${songResponse.artists[1].name}`,
                            image_url: songResponse.preview_url,
                            default_action: {
                                type: "web_url",
                                url: songResponse.preview_url,
                                webview_height_ration: 'tall'
                            }
                        }
                    ]
                }
            }
        }
    };
    messengerApi.callSendApi(messageData);
}

Conversation.querySong = function(recipientId, messageText, callback) {
    return messengerApi.querySpotify(messageText, function(songDetails) {
        return songDetails.tracks.items[0];
    });
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
