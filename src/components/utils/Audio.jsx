import { getAudioExtension } from "./utils";
import { useEffect } from "react";

const AudioJSX = ({
  audioRef,
  audioFileUrls,
  isOn,
  playCondition,
  pitchCondition,
  isHandlingMusic,
  hasLoop = false,
}) => {
  useEffect(() => {
    if (isHandlingMusic) {
      if (playCondition) {
        audioRef.current.playbackRate = 1.0;
        audioRef.current.play();
      } else if (pitchCondition) {
        audioRef.current.playbackRate = 0.6;
      } else if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isHandlingMusic, playCondition, pitchCondition, audioRef]);

  return (
    <audio ref={audioRef} className="hidden" loop={hasLoop} muted={!isOn}>
      {audioFileUrls &&
        audioFileUrls.map((fileUrl, i) => {
          const extension = getAudioExtension(fileUrl);
          return <source key={i} src={fileUrl} type={`audio/${extension}`} />;
        })}
      Your browser does not support the audio element
    </audio>
  );
};

export default AudioJSX;
