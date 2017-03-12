let messengerApi = require('./apis/types/messengerapi');
let graphApi = require('./apis/types/graphapi');
let spotifyApi = require('./apis/types/spotifyapi');

var Conversation = {};

/**
 * Handles the initial "Get Started" button click
 *
 * @author GG
 *
 * @param Object event Event object returned from Messenger API
 *
 * @see https://developers.facebook.com/docs/messenger-platform/webhook-reference/postback
 */
Conversation.receivedPostback = function(event) {
    var senderId = event.sender.id;
    var recipientId = event.recipient.id;
    var timeOfPostback = event.timestamp;

    graphApi.getUser(senderId, function(user) {
        let message = `Welcome ${user.first_name}! Let me know the name of a song, and I can tell you who made it.`;
        Conversation.sendTextMessage(senderId, message);
    });
}

/**
 * Handles any messages sent from user via Messenger to the bot
 *
 * @author GG
 *
 * @param Object event Event object from Messenger API
 *
 * @see https://developers.facebook.com/docs/messenger-platform/send-api-reference#request
 */
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

Conversation.querySong = function(senderId, messageText) {
    console.log(senderId);
    console.log("called");
    spotifyApi.queryTrack(messageText, function(songData) {
        console.log(senderId);
        console.log(songData);
    }).bind(senderId);
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

// Conversation.querySong = function(recipientId, messageText, callback) {
//     return messengerApi.querySpotify(messageText, callback, function(resolve, songDetails) {
//         resolve(songDetails.tracks.items[0]);
//     });
// }



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
