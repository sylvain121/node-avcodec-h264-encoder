var fs = require('fs');

var encoder = require('../index.js');
var chat = fs.readFileSync(__dirname + "/chat.rgba");

var frameSend = true;

var width = 1280;
var height = 960;

var options = {
	inputWidth: 1280,
	inputHeight: 960,
	outputWidth: 800,
	outputHeight: 600,
	bit_rate: 4000000,
	fps: 25,
	sample: encoder.YUV_420P
};


encoder.initSync(options);

var net = require('net');

var server = net.createServer(function(socket) {


})
	.on('connection', function(socket) {
		timer = setInterval(function() {
			if(frameSend) {
				frameSend = false;
				var t = new Date();
				var frame = encoder.encodeFrameSync(chat);
				console.log('encoder time : '+(new Date() -t));
				if (frame !== undefined) {
					socket.write(frame, function(){
						frameSend=true;
					});

				}

			}
		}, 1000 / 25);

	});

server.listen(1337, '127.0.0.1');
