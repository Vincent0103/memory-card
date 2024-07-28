import { useState } from "react";
import Card from "./Card";

const CardsContainer = ({ hasGameStarted, children }) => {
  const onGameStartTransitioner = !hasGameStarted
    ? "translate-z-back opacity-0 pointer-events-none -z-10"
    : "absolute translate-z-idle opacity-1";

  return (
    <div
      className={`${onGameStartTransitioner} row-start-2 flex flex-wrap justify-center gap-5 max-w-[50%] transition-slide
      bg-black/60 p-8 rounded-xl backdrop-blur-2xl border border-white/50 shadow-2xl`}
    >
      {children}
    </div>
  );
};

const Gameboard = ({ hasGameStarted }) => {
  const characterIds = [170732, 170733, 170734, 170735, 174749, 174750, 174748];
  const [isCardClicked, setIsCardClicked] = useState(false);

  const handleCardClick = () => {
    setIsCardClicked(!isCardClicked);
  }

  return (
    <CardsContainer hasGameStarted={hasGameStarted}>
      {characterIds.map((id, index) => (
        <Card key={index} characterId={id}
        isCardClicked={isCardClicked}
        handleCardClick={handleCardClick} />
      ))}
    </CardsContainer>
  );
};

export default Gameboard;
