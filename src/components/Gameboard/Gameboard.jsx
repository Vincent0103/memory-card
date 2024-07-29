import { useEffect, useMemo, useState } from "react";
import cardsShuffled from "../../assets/audios/cards-shuffled.wav";
import Card from "./Card";
import methodsExpension from "../utils/utils";
import CardsContainer from "./CardsContainer";
import Scoreboard from "./Scoreboard";
import { produce } from "immer";

methodsExpension();
const Gameboard = ({ hasGameStarted, handleGameStart }) => {
  const characterIds = useMemo(
    () => [170732, 170733, 170734, 170735, 174749, 174750, 174748],
    []
  );
  
  const [doFetch, setDoFetch] = useState(true);
  const [isCardClicked, setIsCardClicked] = useState(false);

  const [shuffledCharacterIds, setShuffledCharacterIds] = useState([
    ...characterIds,
  ]);
  const [clickedCharacterIds, setClickedCharacterIds] = useState([]);

  const [scores, setScores] = useState({
    currentScore: 0,
    bestScore: 0,
  });


  useEffect(() => {
    if (isCardClicked) setShuffledCharacterIds([...characterIds].shuffle());
  }, [characterIds, isCardClicked]);

  const playAudio = (audioFiles) => {
    if (audioFiles.endsWith(".mp4")) {
      const audio = new Audio(audioFiles);
      audio.play();
    } else if (audioFiles.endsWith(".wav")) {
      const audio = new Audio(audioFiles);
      audio.play();
    } else if (audioFiles.endsWith(".mp3")) {
      const audio = new Audio(audioFiles);
      audio.play();
    } else {
      console.log("Invalid audio file format");
    }
  };

  const handleDoFetch = (canFetch) => {
    setDoFetch(canFetch);
  };

  const handleCardClick = (isBeingAnimated, characterId) => {
    if (isBeingAnimated && !isCardClicked) {
      if (clickedCharacterIds.includes(characterId)) {
        setClickedCharacterIds([]);
        setScores(
          produce((draft) => {
            draft.currentScore = 0;
          })
        );
        handleGameStart(true);
        return;
      }

      playAudio(cardsShuffled);
      setIsCardClicked(true);

      setClickedCharacterIds(
        produce((draft) => {
          draft.push(characterId);
        })
      );

      setScores(
        produce((draft) => {
          draft.currentScore += 1;
          if (draft.currentScore > draft.bestScore) {
            draft.bestScore = draft.currentScore;
          }
        })
      );
    } else if (!isBeingAnimated) {
      setIsCardClicked(false);
    }
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
            doFetch={doFetch}
            handleDoFetch={handleDoFetch}
          />
        ))}
      </CardsContainer>
      <Scoreboard hasGameStarted={hasGameStarted} {...scores} />
    </div>
  );
};

export default Gameboard;
