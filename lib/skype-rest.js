/**
 * Skype REST
 *
 * Copyright (c) 2013-2014 Vyacheslav Slinko
 * Licensed under the MIT License
 */


var skypeAPI = require('skype-api');
var express = require('express');


function skypeREST(options) {
    var client,
        app = express();

    if (options && options.client) {
        client = options.client;
    } else {
        client = skypeAPI();
        client.connect();
    }

    function callbackFactory(req, res, code) {
        return function(err, result) {
            if (err) {
                console.error(err);
                return res.send(500);
            }

            res.send(code || 200, result);
        };
    }

    var messageListeners = [];

    client.on('message', function(message) {
        messageListeners.forEach(function(res) {
            res.write('event: message\n');
            res.write('data: ' + JSON.stringify(message) + '\n\n');
        });
    });

    app.get('/messages/', function(req, res) {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*'
        });

        res.write('event: init\n\n');

        res.on('close', function() {
            messageListeners = messageListeners.filter(function(r) {
                return r !== res;
            });
        });

        messageListeners.push(res);
    });

    app.get('/chats/', function(req, res) {
        client.getChats(callbackFactory(req, res));
    });

    app.get('/chats/:id', function(req, res) {
        client.getChat(req.params.id, callbackFactory(req, res));
    });

    app.get('/users/:id', function(req, res) {
        client.getUser(req.params.id, callbackFactory(req, res));
    });

    app.post('/chats/:id/messages', function(req, res) {
        if (!req.body.body) {
            return res.send(400);
        }

        client.sendMessage(req.params.id, req.body.body, callbackFactory(req, res, 201));
    });

    return app;
}


module.exports = skypeREST;
