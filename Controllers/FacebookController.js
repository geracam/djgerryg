var FacebookController = {
    getSuccessfulFbAuth : (response, request) => response.status(200).send(request.query['hub.challenge']),
}

module.exports = FacebookController;
