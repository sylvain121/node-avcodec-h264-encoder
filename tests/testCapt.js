var encoder = require('./index.js');
var robot = require('robotjs');

var width = 1920;
var height = 1080;

encoder.initSync(width,height, width,height);
setInterval(function(){
  var img = robot.screen.capture(0,0, width, height);
  var frame =  encoder.encodeFrameSync(img.image);
  console.log(frame);
}, 100);

