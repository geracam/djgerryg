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
        let message = `Welcome ${user.first_name}! Let me know the name of a song, and I can tell you who made it, and give you a little preview`;
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

/**
 * Handles querying of song name by routing to Spotify API lib
 *
 * @author GG
 *
 * @param string senderId     ID of user interacting with bot from MessengerApi
 * @param string messageText  Actual text user sent the bot
 */
Conversation.querySong = function(senderId, messageText) {
    let sId = senderId;
    spotifyApi.queryTrack(messageText, function(songData) {
        var messageTemplate = Conversation.generateSongResponseTemplate(sId, songData);
        console.log(songData);
        var audioTemplate = Conversation.generateSongResponseTemplate(sId, songData);
        messengerApi.callSendApi(messageTemplate);
        messengerApi.callSendApi(audioTemplate);
    });
}

Conversation.generateSongResponseTemplate = function(senderId, songData) {
    var title = `${songData.artists[0].name}`;
    if (songData.artists.length > 1) {
        title = title + `${songData.artists[1].name}`;
    }

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
                            title: title,
                            image_url: songData.album.images[1].url,
                            default_action: {
                                type: "web_url",
                                url: songData.album.external_urls.spotify,
                                webview_height_ratio: 'tall'
                            },
                            buttons: [
                                {
                                    type: 'web_url',
                                    url: songData.artists[0].external_urls.spotify,
                                    title: `Hear more from ${songData.artists[0].name}`
                                }
                            ]
                        }
                    ]
                }
            }
        }
    };
    return messageData;
}

Conversation.getSongPreviewMessage = function(senderId, songData) {
    var audioPreview = {
        recipient: {
            id: senderId
        },
        message: {
            attachment: {
                type: "audio",
                payload: {
                    url: songData.preview_url
                }
            }
        }
    };
    return audioPreview;
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
