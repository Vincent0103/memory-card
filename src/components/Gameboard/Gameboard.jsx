import { useEffect, useMemo, useRef, useState } from "react";
import { produce } from "immer";
import Card from "./Card";
import methodsExpension from "../utils/utils";
import CardsContainer from "./CardsContainer";
import Scoreboard from "./Scoreboard";
import Audio from "../utils/Audio";
import cardsShuffledMP3 from "../../assets/audios/cards-shuffled.mp3";
import cardsShuffledWAV from "../../assets/audios/cards-shuffled.wav";

methodsExpension();
const Gameboard = ({ hasGameStarted, handleGameStart, isSoundEffectOn }) => {
  const cardsShuffleAudioRef = useRef(null);
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

  const handleDoFetch = (canFetch) => {
    setDoFetch(canFetch);
  };

  const handleScores = (hasLost) => {
    if (hasLost) {
      setScores(
        produce((draft) => {
          draft.currentScore = 0;
        })
      );
    } else {
      setScores(
        produce((draft) => {
          draft.currentScore += 1;
          if (draft.currentScore > draft.bestScore) {
            draft.bestScore = draft.currentScore;
          }
        })
      );
    }
  };

  const handleClickedCharacterIds = (characterId) => {
    if (characterId) {
      setClickedCharacterIds(
        produce((draft) => {
          draft.push(characterId);
        })
      );
    } else {
      setClickedCharacterIds([]);
    }
  };

  const handleCardClick = (isBeingAnimated, characterId) => {
    if (isBeingAnimated && !isCardClicked) {
      if (clickedCharacterIds.includes(characterId)) {
        handleClickedCharacterIds();
        handleScores(true);
        handleGameStart(true);
        return;
      }

      cardsShuffleAudioRef.current.play();
      setIsCardClicked(true);

      handleClickedCharacterIds(characterId);
      handleScores(false);
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
      <Audio
        audioRef={cardsShuffleAudioRef}
        audioFileUrls={[cardsShuffledMP3, cardsShuffledWAV]}
        isOn={isSoundEffectOn}
      />
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
