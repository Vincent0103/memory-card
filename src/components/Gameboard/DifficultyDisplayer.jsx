const DifficultyDisplayer = ({ difficulty }) => {
  const color = {
    easy: "text-lime-300/90",
    medium: "text-orange-300/90",
    hard: "text-red-300/90",
  }

  const text = difficulty.toUpperCase();
  return (
    <div className="flex justify-center font-extrabold tracking-wide">
      <h1 className={`absolute text-5xl h-min p-4 translate-x-0.5 translate-y-0.5 text-black/50 -z-[1]`}>{text}</h1>
      <h1 className={`text-5xl h-min p-4 ${color[difficulty]}`}>{text}</h1>
    </div>
  )
};

export default DifficultyDisplayer;
