import { useEffect, useRef } from "react";
import GameStateBtn from "./GameStateBtn";
import loseSoundMP3 from "../assets/audios/music/lose-sound.mp3";
import loseSoundWAV from "../assets/audios/music/lose-sound.wav";
import AudioJSX from "./utils/Audio";

const LoseScreen = ({ hasGameEnded, handleGameState, isMusicOn, soundEffectAudioRef, isSoundEffectOn }) => {
  const loseSoundRef = useRef(null);

  const handleRetryBtnClick = () => {
    if (isSoundEffectOn) soundEffectAudioRef.current.play();
    handleGameState({ ended: false, retried: true });
  };

  return (
    <>
      <AudioJSX
        audioRef={loseSoundRef}
        audioFileUrls={[loseSoundMP3, loseSoundWAV]}
        isOn={isMusicOn}
        playCondition={hasGameEnded}
        hasLoop={true}
        isHandlingMusic={true}
      />
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black/80 backdrop-blur-3xl
            flex flex-col justify-center items-center transition-opacity
            gap-8 ${
              hasGameEnded
                ? "opacity-1 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
      >
        <h1 className="text-[10rem] leading-none font-cristone text-red-800 tracking-wide">
          YOU LOSE
        </h1>
        <GameStateBtn
          clickHandler={handleRetryBtnClick}
          text={"RETRY"}
        />
      </div>
    </>
  );
};

export default LoseScreen;
