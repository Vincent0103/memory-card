import { useEffect } from "react";

const AudioJSX = ({
  audioRef,
  audioFileUrls,
  extensions,
  isOn,
  playCondition,
  pitchCondition,
  mutedCondition,
  isHandlingMusic,
  autoPlay = false,
  hasLoop = false,
}) => {
  useEffect(() => {
    if (isHandlingMusic) {
      if (playCondition) {
        audioRef.current.playbackRate = 1.0;
        audioRef.current.play();
      } else if (pitchCondition) {
        audioRef.current.playbackRate = 0.6;
      } else if (mutedCondition === true) { // strict equality if mutedCondition isn't provided as a prop
        audioRef.current.pause();
      } else if (mutedCondition === false) {
        audioRef.current.play();
      } else if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [
    isHandlingMusic,
    playCondition,
    pitchCondition,
    mutedCondition,
    audioRef,
  ]);

  return (
    <audio
      ref={audioRef}
      className="hidden"
      autoPlay={autoPlay}
      loop={hasLoop}
      muted={!isOn}
    >
      {audioFileUrls &&
        audioFileUrls.map((fileUrl, i) => {
          return (
            <source key={i} src={fileUrl} type={`audio/${extensions[i]}`} />
          );
        })}
      Your browser does not support the audio element
    </audio>
  );
};

export default AudioJSX;
