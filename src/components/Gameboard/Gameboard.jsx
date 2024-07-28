import { useEffect, useMemo, useState } from "react";
import Card from "./Card";
import methodsExpension from "../utils";
import CardsContainer from "./CardsContainer";
import Scoreboard from "./Scoreboard";
import { produce } from "immer";

methodsExpension();
const Gameboard = ({ hasGameStarted }) => {
  const characterIds = useMemo(
    () => [170732, 170733, 170734, 170735, 174749, 174750, 174748],
    []
  );

  const [isCardClicked, setIsCardClicked] = useState(false);
  const [shuffledCharacterIds, setShuffledCharacterIds] = useState([
    ...characterIds,
  ]);
  const [scores, setScores] = useState({
    currentScore: 0,
    bestScore: 0,
  });
  const [clickedCharacterIds, setClickedCharacterIds] = useState([]);

  useEffect(() => {
    if (isCardClicked) setShuffledCharacterIds([...characterIds].shuffle());
  }, [characterIds, isCardClicked]);

  const handleCardClick = (isBeingAnimated, characterId) => {
    if (isBeingAnimated && !isCardClicked) {
      if (clickedCharacterIds.includes(characterId)) return;

      console.log('doing');
      setIsCardClicked(true);

      setClickedCharacterIds(
        produce((draft) => {
          draft.push(characterId);
        })
      );

      setScores(
        produce((draft) => {
          draft.currentScore += 1;
          if (draft.currentScore > draft.bestScore) draft.bestScore += 1;
        })
      );
    } else if (!isBeingAnimated) setIsCardClicked(false);
  };

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
      <Scoreboard hasGameStarted={hasGameStarted} {...scores} />
    </div>
  );
};

export default Gameboard;
