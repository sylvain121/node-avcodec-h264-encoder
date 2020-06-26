var nodeH264Ffmpeg = require('bindings')('nodeh264ffmpeg');

module.exports.YUV_420P = 1;
module.exports.YUV_444P = 2;


module.exports.initSync = function(options) {
    console.log(options.sample);
    nodeH264Ffmpeg.init(options.inputWidth,
        options.inputHeight,
        options.outputWidth,
        options.outputHeight,
        options.bit_rate,
        options.fps,
        options.sample
    );

}

module.exports.encodeFrameSync = function(frameData) {
    return nodeH264Ffmpeg.encodeFrame(frameData);
}
module.exports.encodeFrame = function(frameData, callback) {
    return nodeH264Ffmpeg.encodeFrame(frameData, callback);
}