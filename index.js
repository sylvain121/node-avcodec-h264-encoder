var nodeH264Ffmpeg = require('bindings')('nodeh264ffmpeg');

module.exports.initSync = function(inputWidth, inputHeight, outputWidth, outputHeight) {
  nodeH264Ffmpeg.init(inputWidth, inputHeight, outputWidth, outputHeight);

}

module.exports.encodeFrameSync = function(frameData) {
  return nodeH264Ffmpeg.encodeFrame(frameData);
}
