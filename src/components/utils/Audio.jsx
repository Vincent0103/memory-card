import { getAudioExtension } from "./utils";

const AudioJSX = ({
  audioRef,
  audioFileUrls,
  isOn,
  playCondition,
  isHandlingMusic,
  hasLoop = false,
}) => {
  if (isHandlingMusic) {
    if (playCondition) audioRef.current.play();
    else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }

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
