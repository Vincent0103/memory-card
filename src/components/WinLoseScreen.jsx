import { useEffect, useRef, useState } from "react";
import GameStateBtn from "./GameStateBtn";
import winMusicMP3 from "../assets/audios/music/dreams-come-true.mp3";
import winMusicWAV from "../assets/audios/music/dreams-come-true.wav";
import AudioJSX from "./utils/Audio";

const WinLoseScreen = ({
  gameState,
  handleGameState,
  soundEffectAudioRef,
  isSoundEffectOn,
  isMusicOn,
}) => {
  const winMusicRef = useRef(null);
  const [showRetryBtn, setShowRetryBtn] = useState(false);

  const handleRetryBtnClick = () => {
    if (showRetryBtn) {
      const dataObject = { ended: false, retried: true };
      if (isSoundEffectOn) soundEffectAudioRef.current.play();
      if (gameState.won) {
        dataObject.home = true;
      }
      handleGameState(dataObject);
      setShowRetryBtn(false);
    }
  };

  useEffect(() => {
    if (gameState.ended) {
      setTimeout(() => {
        setShowRetryBtn(true);
      }, (gameState.won) ? 5000 : 2000);
    }
  }, [gameState.ended, gameState.won]);

  const onEndTransitioner = gameState.ended
    ? "opacity-1 pointer-events-auto"
    : "opacity-0 pointer-events-none";

  let text;
  if (!gameState.won) {
    text = (
      <h1
        className={`text-[10rem] max-2xl:text-9xl max-md:text-7xl leading-none font-cristone text-red-800 tracking-wide transition-transform
        ${!showRetryBtn && "translate-y-16"}`}
      >
        YOU LOSE
      </h1>
    );
  } else {
    text = (
      <div
        className={`relative transition-transform ${!showRetryBtn && "translate-y-16"}`}
      >
        <h1
          className={`text-[10rem] max-2xl:text-9xl max-md:text-6xl leading-none text-orange-300/90 tracking-wide
            font-extrabold`}
        >
          YOU WIN
        </h1>
        <h1
          className={`absolute top-2 left-2 max-md:top-1 max-md:left-1 text-[10rem]
            max-2xl:text-9xl max-md:text-6xl leading-none text-black/50 tracking-wide text-nowrap
            -z-[1] font-extrabold pointer-events-none select-none`}
        >
          YOU WIN
        </h1>
      </div>
    );
  }

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-full ${!gameState.won ? "bg-black/80 gap-8" : "gap-14"} backdrop-blur-3xl
              flex flex-col justify-center items-center transition-opacity
              gap-8 max-md:gap-5 ${onEndTransitioner}`}
      >
        {text}
        <GameStateBtn
          clickHandler={handleRetryBtnClick}
          text={gameState.won ? "HOME" : "RETRY"}
          customStyling={`transition-slide ${showRetryBtn ? "translate-z-idle opacity-1" : "translate-z-back opacity-0 pointer-events-none"}`}
        />
      </div>
      <AudioJSX
        audioRef={winMusicRef}
        audioFileUrls={[winMusicMP3, winMusicWAV]}
        isOn={isMusicOn}
        playCondition={gameState.won && !gameState.home}
        isHandlingMusic={true}
      />
    </>
  );
};

export default WinLoseScreen;
