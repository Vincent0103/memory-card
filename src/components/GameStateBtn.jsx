const GameStateBtn = ({ clickHandler, text, customStyling = "" }) => (
  <div onClick={clickHandler} className="group">
    <button
      className={`transition-colors bg-zinc-200 w-[216px] h-[88px] rounded-lg shadow-lg
    border-4 border-black group-hover:border-white group-hover:bg-zinc-900
    ${customStyling}`}
    >
      <p className="transition-colors text-5xl font-extrabold text-black group-hover:text-white">
        {text}
      </p>
    </button>
  </div>
);

export default GameStateBtn;
