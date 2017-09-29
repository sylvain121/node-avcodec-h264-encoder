{
  "targets": [
  {
    "target_name": "nodeh264ffmpeg",
      "sources": [  
        "node-h264-ffmpeg.cc", 
      "functions.cc", 
      "encoder_ffmpeg.c" 
      ],
      "include_dirs" : [
        "<!(node -e \"require('nan')\")"

      ],
      "cflags" : [
        "-Wall",
        "-O3"
      ],
      "link_settings": {
        "libraries": [
          "-lavutil",
        "-lavcodec",
        "-lpthread",
        "-lswscale",
        "-lx264"
        ]
      }


  }

  ],

}
