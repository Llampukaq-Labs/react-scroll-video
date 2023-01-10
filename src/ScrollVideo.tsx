import { useEffect, useRef, useState } from "react";
interface ReactScrollVideo
  extends React.DetailedHTMLProps<
    React.SourceHTMLAttributes<HTMLSourceElement>,
    HTMLSourceElement
  > {
  playback?: number;
  frameNumber?: number;
}
function ScrollVideo({
  // lower numbers = faster playback
  playback = 500,
  //initial frame
  frameNumber = 0,
  ...props
}: ReactScrollVideo) {
  const [height, setHeight] = useState<string>();
  const [time, setTime] = useState();
  const video = useRef<HTMLVideoElement>(null);
  const handleLoadedMetadata = () => {
    if (video.current != undefined) {
      setHeight(`${Math.floor(video.current?.duration) * playback}px`);
      video.current.currentTime = frameNumber;
    }
  };

  function scrollPlay() {
    var frameNumber = window.pageYOffset / playback;
    if (video.current != undefined) {
      //@ts-ignore
      setTime(frameNumber);
      video.current.currentTime = frameNumber;
      window.requestAnimationFrame(scrollPlay);
    }
  }
  useAnimationFrame(() => {
    scrollPlay();
  });
  return (
    <>
      <div>
        <div style={{ height }} />
        <video
          ref={video}
          onLoadedMetadata={handleLoadedMetadata}
          id="v0"
          tabIndex={0}
          preload="metadata"
          style={{ position: "fixed", top: 0, left: 0, width: "100%" }}
        >
          <source {...props} />
        </video>
      </div>
    </>
  );
}

export default ScrollVideo;
const useAnimationFrame = (callback: any) => {
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const animate = (time: any) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime);
    }
    previousTimeRef.current = time;
    //@ts-ignore
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    //@ts-ignore
    requestRef.current = requestAnimationFrame(animate);
    //@ts-ignore
    return () => cancelAnimationFrame(requestRef.current);
  }, []);
};
