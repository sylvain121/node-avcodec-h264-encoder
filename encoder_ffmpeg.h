
#ifdef __cplusplus
extern "C" {

#endif
void encoder_init(int *desktopWidth,int *desktopHeight,int *frameWidth,int *frameHeight);
void encoder_encodeFrame(unsigned char *srcData[], unsigned char **dstData, unsigned long *frameSize);
void free_av_packet();
#ifdef __cplusplus
}
#endif
