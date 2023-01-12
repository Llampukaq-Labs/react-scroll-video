# React Scroll Video

This component allows scrolling in videos

# How work

```js
import React from "react";
import ScrollVideo from "react-scroll-video";

export default function Index() {
  return (
    <ScrollVideo
      // lower numbers = faster playback
      playback={5000}
      type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
      src="https://www.apple.com/media/us/mac-pro/2013/16C1b6b5-1d91-4fef-891e-ff2fc1c1bb58/videos/macpro_main_desktop.mp4"
    />
  );
}
```

The parameter playback defines the speed of the scrolling of the video, the smaller the number, the faster the playback will be in scroll
