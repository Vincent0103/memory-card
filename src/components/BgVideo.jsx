import { useRef, useState } from "react";
import bgVideoFallback from "../assets/images/bgVideoFallback.png";
import bgVideoMP4 from "../assets/videos/bgvideo.mp4";
import bgVideoWEBM from "../assets/videos/bgvideo.webm";
import { useEffect } from "react";

const canAutoplayVideo = (videoElement, mutedCondition) => {
  return new Promise((resolve) => {
    videoElement.autoPlay = true;
    videoElement.muted = mutedCondition; // Most browsers require videos to be muted to autoplay

    videoElement.onplay = () => resolve(true);
    videoElement.onerror = () => resolve(false);

    videoElement.play().catch(() => resolve(false));
  })
}

const BgVideo = ({ isMusicOn, hasGameStarted }) => {
  const videoElement = useRef(null);
  const [canShowVideo, setCanShowVideo] = useState(true);

  useEffect(() => {
    if (videoElement.current) {
      canAutoplayVideo(videoElement.current, !isMusicOn || hasGameStarted).then((canAutoplay) => {
        if (!canAutoplay) setCanShowVideo(false);
      })
    }
  }, [hasGameStarted, isMusicOn]);

  return (
    canShowVideo
    ?
    <div className="absolute top-0 left-0 h-full w-full -z-10 bg-black">
      <video
        ref={videoElement}
        className="h-full w-full object-cover"
        loop
      >
        <source src={bgVideoWEBM} type="video/webm" />
        <source src={bgVideoMP4} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    :
    <div className="absolute top-0 left-0 h-full w-full -z-10 bg-black">
      <img className="h-full w-full object-cover" src={bgVideoFallback} alt="Visual of the Chainsaw Man Anime" />
    </div>
  )
};

export default BgVideo;
