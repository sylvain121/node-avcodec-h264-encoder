var fs = require('fs');

var encoder = require('../index.js');
var chat = fs.readFileSync(__dirname + "/chat.rgba");

var width = 1280;
var height = 960

encoder.initSync(width, height, 800, 600);

var net = require('net');

var server = net.createServer(function(socket) {


    })
    .on('connection', function(socket) {
        timer = setInterval(function() {
            var frame = encoder.encodeFrameSync(chat);
            if (frame !== undefined) {
                socket.write(frame);

            }
        }, 1000 / 25);

    });

server.listen(1337, '127.0.0.1');