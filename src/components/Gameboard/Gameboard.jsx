import { useEffect, useMemo, useState } from "react";
import Card from "./Card";
import methodsExpension from "../utils";
import CardsContainer from "./CardsContainer";
import Scoreboard from "./Scoreboard";

methodsExpension();
const Gameboard = ({ hasGameStarted }) => {
  const characterIds = useMemo(
    () => [170732, 170733, 170734, 170735, 174749, 174750, 174748],
    []
  );

  const [isCardClicked, setIsCardClicked] = useState(false);
  const [shuffledCharacterIds, setShuffledCharacterIds] =
    useState(characterIds);

  useEffect(() => {
    if (isCardClicked) setShuffledCharacterIds(characterIds.shuffle());
  }, [characterIds, isCardClicked]);

  const handleCardClick = (isBeingAnimated) => {
    if (isBeingAnimated && !isCardClicked) setIsCardClicked(true);
    else if (!isBeingAnimated) setIsCardClicked(false);
  };

  console.log(shuffledCharacterIds);

  const onGameStartTransitioner = !hasGameStarted
    ? "translate-z-back opacity-0 pointer-events-none"
    : "translate-z-idle opacity-1";
  return (
    <div
      className={`absolute row-start-2 ${onGameStartTransitioner} transition-slide
      grid grid-rows-[1fr_auto_1fr] gap-5 max-w-[80%] h-full`}
    >
      <CardsContainer hasGameStarted={hasGameStarted}>
        {shuffledCharacterIds.map((id, index) => (
          <Card
            key={index}
            characterId={id}
            isCardClicked={isCardClicked}
            handleCardClick={handleCardClick}
          />
        ))}
      </CardsContainer>
      <Scoreboard hasGameStarted={hasGameStarted} />
    </div>
  );
};

export default Gameboard;
