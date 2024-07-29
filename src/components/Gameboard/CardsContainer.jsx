const CardsContainer = ({ children }) => {
  return (
    <div
      className="flex flex-wrap justify-center gap-5 bg-black/60 p-8
      rounded-xl backdrop-blur-2xl border border-white/50 shadow-2xl"
    >
      {children}
    </div>
  );
};

export default CardsContainer;
