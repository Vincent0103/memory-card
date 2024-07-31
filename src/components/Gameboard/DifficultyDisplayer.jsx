const DifficultyDisplayer = ({ difficulty }) => {
  const color = {
    easy: "text-lime-300/90",
    medium: "text-orange-300/90",
    hard: "text-red-300/90",
  };

  const text = difficulty.toUpperCase();
  return (
    <div className="flex justify-center font-extrabold tracking-wide">
      <h1
        className={`absolute text-5xl max-2xl:text-4xl max-md:text-2xl h-min p-4 max-md:p-1
        translate-x-0.5 translate-y-0.5 max-2xl:translate-x-[1.5px] max-2xl:translate-y-[1.5px]
        text-black/50 -z-[1]`}
      >
        {text}
      </h1>
      <h1
        className={`text-5xl max-2xl:text-4xl max-md:text-2xl h-min p-4 max-md:p-1 ${color[difficulty]}`}
      >
        {text}
      </h1>
    </div>
  );
};

export default DifficultyDisplayer;
