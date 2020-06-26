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
    type EncoderCallback = (err: Error, frame: Buffer)  => void;   

    function initSync(options: AvcodecH264Encoder);
    function encodeFrameSync(sourceFrame: Buffer): Buffer;
    function encodeFrame(sourceFrame: Buffer, cb: EncoderCallback);

}
