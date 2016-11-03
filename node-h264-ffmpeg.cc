#include "functions.h"

using v8::FunctionTemplate;


// C++ constructs that are exposed to javascript are exported here

NAN_MODULE_INIT(InitAll) {
  Nan::Set(target, Nan::New("init").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(init)).ToLocalChecked());
  Nan::Set(target, Nan::New("encodeFrame").ToLocalChecked(),
    Nan::GetFunction(Nan::New<FunctionTemplate>(encodeFrame)).ToLocalChecked());
  
}

NODE_MODULE(nodeh264ffmpeg, InitAll)
