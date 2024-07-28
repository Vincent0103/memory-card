import { useCallback } from "react";

import MenuTitle from "./MenuTitle";
import PlayBtn from "./PlayBtn";

const MainMenu = ({
  soundEffectAudioRef,
  isSoundEffectOn,
  handleGameStart,
  hasGameStarted,
}) => {
  const handlePlayBtnClick = useCallback(() => {
    if (isSoundEffectOn) soundEffectAudioRef.current.play();
    handleGameStart();
  }, [isSoundEffectOn, handleGameStart, soundEffectAudioRef]);

  const onGameStartTransitioner = hasGameStarted
    ? "translate-z-front opacity-0 pointer-events-none -z-10"
    : "absolute translate-z-idle opacity-1";

  return (
    <div className={`${onGameStartTransitioner} justify-items-center items-center row-start-2 transition-slide`}>
      <div className="relative w-min row-start-2 flex flex-col items-center gap-6">
        <MenuTitle />
        <PlayBtn clickHandler={handlePlayBtnClick} />
        <div className="absolute max-w-[380px] bg-black/60 rounded-2xl backdrop-blur-xl border border-white/50 shadow-lg
        top-[300px]">
          <p className="text-center drop-shadow-2xl my-4 mx-6">
            For the best experience, please enable game music using the button below !
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
