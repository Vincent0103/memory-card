const Scoreboard = ({ hasGameStarted, currentScore = 0, bestScore = 0 }) => (
  hasGameStarted
  &&
  <div className="text-center font-bold text-white/90
  flex flex-col gap-2 row-start-1 self-end font-divergentes">
    <h3 className="text-5xl tracking-wide">Best Score: {bestScore} </h3>
    <h1 className="text-8xl tracking-wide">Current Score: {currentScore} </h1>
  </div>
)

export default Scoreboard;
