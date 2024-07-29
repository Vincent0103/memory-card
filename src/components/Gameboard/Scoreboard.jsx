const Scoreboard = ({ hasGameStarted, currentScore, bestScore }) =>
  hasGameStarted && (
    <div
      className="text-center font-bold text-white/90
  flex flex-col gap-2 self-end font-divergentes"
    >
      <div className="relative">
        <h3 className="text-5xl tracking-wide">Best Score: {bestScore} </h3>
        <div className="absolute top-0 left-0 flex justify-center w-full pointer-events-none">
          <h3 className="text-5xl text-black/50 -z-[1] tracking-wide ml-1 mt-1">Best Score: {bestScore} </h3>
        </div>
      </div>
      <div className="relative">
        <h3 className="text-8xl tracking-wide">Current Score: {currentScore} </h3>
        <div className="absolute top-0 left-0 flex justify-center w-full pointer-events-none">
          <h3 className="text-8xl text-black/50 -z-[1] tracking-wide ml-1 mt-1">Current Score: {currentScore} </h3>
        </div>
      </div>
    </div>
  );

export default Scoreboard;
