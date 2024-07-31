const CardsContainer = ({ children }) => {
  return (
    <div
      className="flex flex-wrap justify-center gap-5 max-2xl:gap-3 bg-black/60 p-8
      max-2xl:p-4 rounded-xl backdrop-blur-2xl border border-white/50 shadow-2xl overflow-y-auto
      max-2xl:max-h-[462px] max-md:max-h-[400px]"
    >
      {children}
    </div>
  );
};

export default CardsContainer;
