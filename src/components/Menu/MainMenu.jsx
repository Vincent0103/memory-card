import { useCallback } from "react";

import MenuTitle from "./MenuTitle";
import PlayBtn from "./PlayBtn";

const MainMenu = ({
  soundEffectAudioRef,
  isSoundEffectOn,
  hasGameStartedHandler,
  hasGameStarted,
}) => {
  const handlePlayBtnClick = useCallback(() => {
    if (isSoundEffectOn) soundEffectAudioRef.current.play();
    hasGameStartedHandler(true);
  }, [isSoundEffectOn, hasGameStartedHandler, soundEffectAudioRef]);

  const onGameStartTransitioner = hasGameStarted
    ? "transition-slide translate-z-front opacity-0"
    : "";

  return (
    <div
      className={`${onGameStartTransitioner} justify-items-center items-center row-start-2`}
    >
      <div className="relative w-min row-start-2 flex flex-col items-center gap-8">
        <MenuTitle />
        <PlayBtn clickHandler={handlePlayBtnClick} />
      </div>
    </div>
  );
};

export default MainMenu;
