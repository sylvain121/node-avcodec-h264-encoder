var fs = require('fs');

var encoder = require('../index.js');
var chat = fs.readFileSync(__dirname + "/chat.rgba");

var width = 1280;
var height = 960

encoder.initSync(width,height, width,height);

encoder.encodeFrameSync(chat);
