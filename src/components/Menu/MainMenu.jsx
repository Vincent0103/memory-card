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

  const onGameStartTransitioner = (gameState.started)
    ? "translate-z-front opacity-0 pointer-events-none -z-10"
    : "absolute translate-z-idle opacity-1";

  return (
    <div
      className={`${onGameStartTransitioner} justify-items-center items-center row-start-2 transition-slide`}
    >
      <div className="relative w-min row-start-2 flex flex-col items-center gap-8">
        <MenuTitle />
        <GameStateBtn clickHandler={handlePlayBtnClick} text={"PLAY"} />
        <div
          className="absolute max-w-[400px] bg-black/60 rounded-2xl backdrop-blur-xl border border-white/50 shadow-lg
        top-[310px]"
        >
          <p className="text-center drop-shadow-lg my-4 mx-6">
            For the best experience, please enable game music using the melody
            button below !
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
