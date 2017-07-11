var encoder = require('../index.js');
var robot = require('robotjs');

var width = 1920;
var height = 1080;
var timer = null;

var options = {
    inputWidth: 1280,
    inputHeight: 960,
    outputWidth: 800,
    outputHeight: 600,
    bit_rate: 4000000,
    fps: 25
};

encoder.initSync(options);


var net = require('net');

var server = net.createServer(function(socket) {


    })
    .on('connection', function(socket) {
        timer = setInterval(function() {
            var img = robot.screen.capture(0, 0, width, height);
            var frame = encoder.encodeFrameSync(img.image);
            if (frame !== undefined) {
                socket.write(frame);

            }
        }, 1000 / 25);

    });

server.listen(1337, '127.0.0.1');