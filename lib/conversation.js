let messengerApi = require('./messengerapi');
let graphApi = require('./apis/types/graphapi');

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
    console.log("this is called now");
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
                            image_url: songResponse.album.images[1].url,
                            default_action: {
                                type: "web_url",
                                url: songResponse.preview_url,
                                webview_height_ratio: 'tall'
                            }
                        }
                    ]
                }
            }
        }
    };
    var audioPreview = {
        recipient: {
            id: senderId
        },
        message: {
            attachment: {
                type: "audio",
                payload: {
                    url: songResponse.preview_url
                }
            }
        }
    };
    messengerApi.callSendApi(messageData);
    messengerApi.callSendApi(audioPreview);
}

Conversation.querySong = function(recipientId, messageText, callback) {
    return messengerApi.querySpotify(messageText, callback, function(resolve, songDetails) {
        resolve(songDetails.tracks.items[0]);
    });
}

Conversation.receivedPostback = function(event) {
    var senderId = event.sender.id;
    var recipientId = event.recipient.id;
    var timeOfPostback = event.timestamp;

    graphApi.getUserParams(senderId, function(user) {
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
