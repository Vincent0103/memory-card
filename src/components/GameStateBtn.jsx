const GameStateBtn = ({ clickHandler, text, customStyling = "" }) => (
  <div onClick={clickHandler} className="group">
    <button
      className={`transition-colors bg-zinc-200 w-[216px] h-[88px]
      max-2xl:w-[174px] max-2xl:h-[74px] max-md:w-[94px] max-md:h-[44px]
      rounded-lg shadow-lg border-4 max-md:border-2 border-black group-hover:border-white
      group-hover:bg-zinc-900 ${customStyling}`}
    >
      <p className="transition-colors text-5xl max-2xl:text-4xl max-md:text-2xl font-extrabold text-black group-hover:text-white">
        {text}
      </p>
    </button>
  </div>
);

export default GameStateBtn;
