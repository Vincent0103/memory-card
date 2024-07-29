const AudioJSX = ({ audioRef, audioFiles }) => (
  <audio ref={audioRef} className="hidden">
    {audioFiles.map((file, i) => {
      return <source key={i} src={file} type={`audio/${extension}`} />;
    })}
    Your browser does not support the audio element
  </audio>
);

export default AudioJSX;
