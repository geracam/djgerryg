/**
 * Middleware to authenticate a request coming into the messenger bot.
 *
 * @author GG
 * @see https://developers.facebook.com/docs/messenger-platform/guides/setup
 */

module.exports = function (request, response, next) {
    if (request.query['hub.mode'] == 'subscribe' && request.query['hub.verify_token'] == MESSENGER_ACCESS_TOKEN) {
        next();
    } else {
        response.status(403).json({
            message: 'Authentication Failed'
        });
    }
}
