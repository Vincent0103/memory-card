import { useRef, useState } from "react";
import bgVideoFallbackJPG from "../assets/images/bgVideoFallback.jpg";
import bgVideoFallbackWEBP from "../assets/images/bgVideoFallback.webp";
import bgVideoMP4 from "../assets/videos/bgvideo.mp4";
import bgVideoWEBM from "../assets/videos/bgvideo.webm";
import MainMenuMP3 from "../assets/audios/music/main-menu.mp3";
import MainMenuWAV from "../assets/audios/music/main-menu.wav";
import { useEffect } from "react";
import AudioJSX from "./utils/Audio";

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
  const imgFallbackAudioRef = useRef(null);
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
      <picture>
        <source srcSet={bgVideoFallbackWEBP} type="image/webp" />
        <img className="h-full w-full object-cover" src={bgVideoFallbackJPG} alt="" />
      </picture>
      <AudioJSX
        audioRef={imgFallbackAudioRef}
        audioFileUrls={[MainMenuMP3, MainMenuWAV]}
        extensions={["mp3", "wav"]}
        isOn={isMusicOn}
        mutedCondition={!isMusicOn || hasGameStarted}
        autoPlay={true}
        hasLoop={true}
        isHandlingMusic={true}
      />
    </div>
  )
};

export default BgVideo;
