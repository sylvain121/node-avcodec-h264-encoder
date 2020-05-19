declare module 'node-avcodec-h264-encoder' {

    interface AvcodecH264Encoder {
        inputWidth: number;
        inputHeight: number;
        outputWidth: number;
        outputHeight: number;
        bit_rate: number;
        fps: number;
        sample: number;
    }


    const YUV_420P = 1;
    const YUV_444P = 2;

    function initSync(inputWidth: number, inputHeight: number, outputWidth: number, outputHeight: number, bitrate: number, fps: number, pix_fmt_int: number);
    function encodeFrameSync(sourceFrame: Buffer): Buffer;

}
