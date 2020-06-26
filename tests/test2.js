var fs = require('fs');

var encoder = require('../index.js');
var chat = fs.readFileSync(__dirname + "/chat.rgba");

var frameSend = true;

var width = 1280;
var height = 960;

var options = {
	inputWidth: 1280,
	inputHeight: 960,
	outputWidth: 1280,
	outputHeight: 960,
	bit_rate: 400000,
	fps: 30,
	sample: encoder.YUV_420P
};


encoder.initSync(options);
timer = setInterval(function() {
		var t = new Date();
		var frame = encoder.encodeFrameSync(chat);
		console.log('encoder time : '+(new Date() -t));
		console.log('frame length : '+frame.length);
		console.log('mem : ', process.memoryUsage());
}, 1000 / 25);
