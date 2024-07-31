import { useEffect, useState } from "react";
import GameStateBtn from "./GameStateBtn";

const WinLoseScreen = ({
  hasGameEnded,
  hasWon,
  handleGameState,
  soundEffectAudioRef,
  isSoundEffectOn,
}) => {
  const [showRetryBtn, setShowRetryBtn] = useState(false);

  const handleRetryBtnClick = () => {
    if (isSoundEffectOn) soundEffectAudioRef.current.play();
    if (hasWon) handleGameState({ home: true, ended: false, retried: true });
    handleGameState({ ended: false, retried: true });
    setShowRetryBtn(false);
  };

  useEffect(() => {
    if (hasGameEnded) {
      setTimeout(() => {
        setShowRetryBtn(true);
      }, 2000);
    }
  }, [hasGameEnded]);

  const onEndTransitioner = hasGameEnded
    ? "opacity-1 pointer-events-auto"
    : "opacity-0 pointer-events-none";

  let text;
  if (!hasWon) {
    text = (
      <h1
        className={`text-[10rem] leading-none font-cristone text-red-800 tracking-wide transition-transform
        ${!showRetryBtn && "translate-y-16"}`}
      >
        YOU LOSE
      </h1>
    );
  } else {
    text = (
      <div className={`relative transition-transform ${!showRetryBtn && "translate-y-16"}`}>
        <h1
          className={`text-[10rem] leading-none text-orange-300/90 tracking-wide
            font-extrabold`}
        >
          YOU WIN
        </h1>
        <h1
          className={`absolute top-2 left-2 text-[10rem] leading-none text-black/50 tracking-wide
            text-nowrap -z-[1] font-extrabold pointer-events-none select-none`}
        >
          YOU WIN
        </h1>
      </div>
    );
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full ${!hasWon && "bg-black/80"} backdrop-blur-3xl
            flex flex-col justify-center items-center transition-opacity
            gap-8 ${onEndTransitioner}`}
    >
      {text}
      <GameStateBtn
        clickHandler={handleRetryBtnClick}
        text={"RETRY"}
        customStyling={`transition-slide ${showRetryBtn ? "translate-z-idle opacity-1" : "translate-z-back opacity-0 pointer-events-none"}`}
      />
    </div>
  );
};

export default WinLoseScreen;
