const CardsContainer = ({ hasGameStarted, children }) => {
  return (
    <div
      className="flex flex-wrap justify-center gap-5 bg-black/60 p-8
      rounded-xl backdrop-blur-2xl border border-white/50 shadow-2xl
      row-start-2"
    >
      {children}
    </div>
  );
};

export default CardsContainer;
