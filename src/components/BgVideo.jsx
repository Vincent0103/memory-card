import bgVideoMP4 from "../assets/videos/bgvideo.mp4";
import bgVideoWEBM from "../assets/videos/bgvideo.webm";

const BgVideo = ({ isMusicOn, hasGameStarted }) => (
  <div className="absolute top-0 left-0 h-full w-full -z-10 bg-orange-950">
    <video
      className="h-full w-full object-cover"
      autoPlay
      loop
      muted={!isMusicOn || hasGameStarted}
    >
      <source src={bgVideoWEBM} type="video/webm" />
      <source src={bgVideoMP4} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
);

export default BgVideo;
