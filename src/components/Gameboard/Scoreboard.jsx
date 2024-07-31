const Scoreboard = ({ currentScore, bestScore }) => (
  <div
    className="text-center font-bold text-white/90
  flex flex-col gap-2 self-end font-divergentes"
  >
    <div className="relative">
      <h3 className="text-5xl max-2xl:text-4xl tracking-wide">
        Best Score: {bestScore}{" "}
      </h3>
      <div className="absolute top-0 left-0 flex justify-center w-full pointer-events-none">
        <h3
          className="text-5xl max-2xl:text-4xl text-black/50 -z-[1] tracking-wide
          translate-x-0.5 translate-y-0.5 max-2xl:translate-x-[1.5px] max-2xl:translate-y-[1.5px]"
        >
          Best Score: {bestScore}{" "}
        </h3>
      </div>
    </div>
    <div className="relative">
      <h3 className="text-8xl max-2xl:text-6xl tracking-wide">
        Current Score: {currentScore}{" "}
      </h3>
      <div className="absolute top-0 left-0 flex justify-center w-full pointer-events-none">
        <h3 className="text-8xl max-2xl:text-6xl text-black/50 -z-[1] tracking-wide
        ml-1 mt-1 max-2xl:ml-0.5 max-2xl:mt-0.5">
          Current Score: {currentScore}{" "}
        </h3>
      </div>
    </div>
  </div>
);

export default Scoreboard;
