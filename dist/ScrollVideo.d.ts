/// <reference types="react" />
interface ReactScrollVideo extends React.DetailedHTMLProps<React.SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement> {
    playback?: number;
    frameNumber?: number;
}
declare function ScrollVideo({ playback, frameNumber, ...props }: ReactScrollVideo): JSX.Element;
export default ScrollVideo;
