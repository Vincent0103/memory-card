import MenuTitle from "./MenuTitle";
import GameStateBtn from "../GameStateBtn";

const MainMenu = ({
  soundEffectAudioRef,
  isSoundEffectOn,
  handleGameState,
  gameState,
}) => {
  const handlePlayBtnClick = () => {
    if (isSoundEffectOn) soundEffectAudioRef.current.play();
    handleGameState({ home: false, started: true, won: false });
  };

  const onGameStartTransitioner = gameState.started
    ? "absolute translate-z-front opacity-0 pointer-events-none -z-10"
    : "absolute translate-z-idle opacity-1";

  return (
    <div
      className={`${onGameStartTransitioner} row-start-2 row-end-2 transition-slide
      top-0 left-0 w-full h-full flex justify-center items-center`}
    >
      <div className="relative w-min h-min flex flex-col items-center gap-8 max-2xl:gap-6 max-md:gap-4">
        <MenuTitle />
        <GameStateBtn clickHandler={handlePlayBtnClick} text={"PLAY"} />
        <div
          className="absolute max-w-[400px] max-2xl:max-w-[300px] bg-black/60 rounded-2xl backdrop-blur-xl border border-white/50 shadow-lg
        top-[310px] max-2xl:top-[220px] max-md:top-[140px]"
        >
          <p className="text-center drop-shadow-lg my-4 mx-6 max-2xl:text-xs max-2xl:my-3 max-2xl:mx-2 max-md:my-2">
            For the best experience, please enable game music using the melody
            button below !
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
