#include "functions.h"
#include "encoder_ffmpeg.h"

class EncodeFrameWorker : public Nan::AsyncWorker
{
public:
  unsigned char *src;
  unsigned char *dstData = NULL;
  unsigned long frameSize = 0;

      EncodeFrameWorker(unsigned char *srcData, Nan::Callback *callback)
      : Nan::AsyncWorker(callback)
  {
    this->src = srcData;
  }

void Execute()
  {
    encoder_encodeFrame(this->src, &dstData, &frameSize);
  } 

  void HandleOKCallback()
  {
    Nan::HandleScope scope;
    v8::Local<v8::Object> dstObject;

    if (this->frameSize > 0 && this->dstData != NULL)
    {
      dstObject = Nan::CopyBuffer((char *)dstData, frameSize).ToLocalChecked();
      v8::Local<v8::Value> argv[] = {
          Nan::Null(), // no error occured
          dstObject

      };
      callback->Call(2, argv);
      free_av_packet();
    }
  }

  void HandleErrorCallback()
  {
    Nan::HandleScope scope;
    v8::Local<v8::Value> argv[] = {
        Nan::New(this->ErrorMessage()).ToLocalChecked(), // return error message
        Nan::Null()

    };
    callback->Call(2, argv);
  }
};

NAN_METHOD(init)
{

  if (info.Length() < 6)
  {
    return Nan::ThrowError(Nan::TypeError("Too few arguments"));
  }
  int inputWidth = info[0]->NumberValue();
  int inputHeight = info[1]->NumberValue();
  int outputWidth = info[2]->NumberValue();
  int outputHeight = info[3]->NumberValue();
  int bit_rate = info[4]->NumberValue();
  int fps = info[5]->NumberValue();
  int pix_fmt_int = info[6]->NumberValue();

  encoder_init(&inputWidth, &inputHeight, &outputWidth, &outputHeight, &bit_rate, &fps, pix_fmt_int);
}

NAN_METHOD(encodeFrameSync)
{

  if (info.Length() < 1)
  {
    return Nan::ThrowError(Nan::TypeError("Too few arguments"));
  }
  v8::Local<v8::Object> srcObject = info[0].As<v8::Object>();
  if (!node::Buffer::HasInstance(srcObject))
  {
    return Nan::ThrowError(Nan::TypeError("Invalid source buffer"));
  }

  unsigned char *srcData = (unsigned char *)node::Buffer::Data(srcObject);
  //output buffer
  v8::Local<v8::Object> dstObject;

  unsigned char *dstData = NULL;
  unsigned long frameSize = 0;

  encoder_encodeFrame(srcData, &dstData, &frameSize);

  if (frameSize > 0 && dstData != NULL)
  {
    dstObject = Nan::CopyBuffer((char *)dstData, frameSize).ToLocalChecked();
    info.GetReturnValue().Set(dstObject);
    free_av_packet();
  }
}

NAN_METHOD(encodeFrame)
{
  if (info.Length() < 2)
  {
    return Nan::ThrowError(Nan::TypeError("Too few arguments"));
  }
  v8::Local<v8::Object> srcObject = info[0].As<v8::Object>();
  if (!node::Buffer::HasInstance(srcObject))
  {
    return Nan::ThrowError(Nan::TypeError("Invalid source buffer"));
  }

  unsigned char *srcData = (unsigned char *)node::Buffer::Data(srcObject);
  //output buffer

  Nan::AsyncQueueWorker(new EncodeFrameWorker(
      srcData, new Nan::Callback(info[1].As<v8::Function>())));
}
