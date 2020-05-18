declare module 'node-avcodec-h264-encoder' {
    function init(inputWidth: number, inputHeight: number, outputWidth: number, outputHeight: number, bitrate: number, fps: number, pix_fmt_int: number);
    function encodeFrame(sourceFrame: Buffer): Buffer;
}
