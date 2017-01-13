var encoder = require('../index.js');
var robot = require('robotjs');

var width =800 ;
var height = 600;
var timer = null;
encoder.initSync(width,height, 800,600);


var net = require('net');

var server = net.createServer(function(socket) {


})
	.on('connection', function(socket){
		timer = setInterval(function() {
			var img = robot.screen.capture(0,0, width, height);
			var frame =  encoder.encodeFrameSync(img.image);
			if(frame !== undefined) {
				socket.write(frame);

			}
		}, 1000/25);

	});

server.listen(1337, '127.0.0.1');
