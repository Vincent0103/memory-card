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
      <div className="relative w-min row-start-2 flex flex-col items-center gap-8">
        <MenuTitle />
        <PlayBtn clickHandler={handlePlayBtnClick} />
      </div>
    </div>
  );
};

export default MainMenu;
