import { getAudioExtension } from "./utils";

const AudioJSX = ({ audioRef, audioFileUrls, isMusicOn }) => (
  <audio ref={audioRef} className="hidden" autoPlay loop={isMusicOn !== undefined} muted={!isMusicOn}>
    {audioFileUrls &&
      audioFileUrls.map((fileUrl, i) => {
        const extension = getAudioExtension(fileUrl);
        return <source key={i} src={fileUrl} type={`audio/${extension}`} />;
      })}
    Your browser does not support the audio element
  </audio>
);

export default AudioJSX;
