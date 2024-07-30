import GameStateBtn from "./GameStateBtn";

const LoseScreen = ({ hasGameEnded, handleGameState }) => (
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
      clickHandler={() =>
        handleGameState({
          ended: false,
          retried: true,
        })
      }
      text={"RETRY"}
    />
  </div>
);

export default LoseScreen;
