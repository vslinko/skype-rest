/**
 * Skype REST
 *
 * Copyright (c) 2013 Vyacheslav Slinko
 * Licensed under the MIT License
 */


var skypeAPI = require('skype-api');


var regex = {
    getChat: /^\/chats\/([^\/]+)$/,
    getUser: /^\/users\/([^\/]+)$/,
    sendMessage: /^\/chats\/([^\/]+)\/messages\/$/
};


function createMiddleware(options) {
    var client = options && options.client
               ? options.client
               : skypeAPI();

    return function(req, res, next) {
        var handler,
            matches,
            args = [];

        if (req.method === 'GET' && req.url === '/chats/') {
            handler = client.getChats;
        } else if (req.method === 'GET' && (matches = regex.getChat.exec(req.url))) {
            handler = client.getChat;
            args.push(decodeURIComponent(matches[1]));
        } else if (req.method === 'GET' && (matches = regex.getUser.exec(req.url))) {
            handler = client.getUser;
            args.push(decodeURIComponent(matches[1]));
        } else if (req.method === 'POST' && (matches = regex.sendMessage.exec(req.url))) {
            handler = client.sendMessage;
            args.push(decodeURIComponent(matches[1]));
            args.push(req.body.body);
        }

        if (!handler) {
            return next();
        }

        args.push(function(err, result) {
            if (err) {
                console.error(err);
                res.writeHead(500);
                return res.end();
            }

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(result));
        });

        handler.apply(client, args);
    };
}


module.exports = createMiddleware;
