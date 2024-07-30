import { useEffect, useState } from "react";
import GameStateBtn from "./GameStateBtn";

const LoseScreen = ({ hasGameEnded, handleGameState }) => {
  const [showRetryBtn, setShowRetryBtn] = useState(false);

  const handleRetryBtnClick = () => {
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

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black/80 backdrop-blur-3xl
            flex flex-col justify-center items-center transition-opacity
            gap-8 ${
              hasGameEnded
                ? "opacity-1 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
    >
      <h1 className={`text-[10rem] leading-none font-cristone text-red-800 tracking-wide transition-transform
        ${!showRetryBtn && "translate-y-16" }`}>
        YOU LOSE
      </h1>
      <GameStateBtn clickHandler={handleRetryBtnClick} text={"RETRY"}
      customStyling={`transition-slide ${showRetryBtn ? "translate-z-idle opacity-1" : "translate-z-back opacity-0"}`} />
    </div>
  );
};

export default LoseScreen;
