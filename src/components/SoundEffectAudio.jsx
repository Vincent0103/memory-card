import btnClickAudioMP3 from "../assets/audios/btn-click.mp3";
import btnClickAudioOGG from "../assets/audios/btn-click.ogg";
import btnClickAudioWAV from "../assets/audios/btn-click.wav";

const SoundEffectAudio = ({ audioRef }) => (
  <audio ref={audioRef} className="hidden">
    <source src={btnClickAudioMP3} type="audio/mpeg" />
    <source src={btnClickAudioOGG} type="audio/ogg" />
    <source src={btnClickAudioWAV} type="audio/wav" />
    Your browser does not support the audio element.
  </audio>
);

export default SoundEffectAudio;
