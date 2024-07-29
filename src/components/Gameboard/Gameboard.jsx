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

  const [characterImgs, setCharacterImgs] = useState(
    characterIds.map((id) => ({
      id,
      name: null,
      jpg: null,
      webp: null,
    }))
  );

  const [doShuffleCards, setDoShuffleCards] = useState(true);
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
    if (doShuffleCards) {
      setShuffledCharacterIds([...characterIds].shuffle());
      setDoShuffleCards(false);
    }
  }, [characterIds, doShuffleCards]);

  const handleDoShuffleCards = (canShuffleCards) => {
    setDoShuffleCards(canShuffleCards);
  };

  useEffect(() => {
    const hasNoCharacterData = (index) => {
      const characterData = characterImgs[index];

      if (!characterData) return false;
      return Object.entries(characterData)
        .filter(([key, _]) => key !== "id")
        .every(([_, value]) => value === null);
    };

    const fetchCharacter = async (characterId) => {
      const retry = (retries, delay, error) => {
        if (retries) {
          console.log(`Retrying... (${retries} retries left)`);
          return new Promise((resolve) => {
            setTimeout(async () => {
              resolve(await fetchData(retries - 1, delay));
            }, delay);
          })
        } else {
          console.error("Could not fetch character: ", error);
        }
      }

      const fetchData = async (retries, delay) => {
        try {
          const response = await fetch(
            // use jikan api to query characters
            `https://api.jikan.moe/v4/characters/${characterId}/full`
          );
          let data = await response.json();
          data = data.data;
          if (!data) {
            return retry(retries, delay, "Too many api calls, status code: 429");
          }

          return data;
        } catch (error) {
          return retry(retries, delay, error);
        }
      }

      const index = characterImgs.findIndex(({ id }) => id === characterId);
      if (index === -1) console.error(`Could not fetch character with a bad id: ${characterId}`);

      const retries = 3;
      const delay = 500;

      if (hasNoCharacterData(index)) {
        let data = await fetchData(retries, delay);

        const characterData = {
          name: data.name,
          jpg: data.images.jpg.image_url,
          webp: data.images.webp.image_url,
        };

        setCharacterImgs(
          produce((draft) => {
            Object.assign(draft[index], characterData);
          })
        );
      }
    };

    characterIds.forEach((id) => {
      fetchCharacter(id);
    });
  }, [characterImgs, characterIds]);

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
        setIsCardClicked(true);
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
        {shuffledCharacterIds.map((shuffledId, index) => {
          const characterIndex = characterImgs.findIndex(
            ({ id }) => id === shuffledId
          );
          const currentCharacterImg = characterImgs[characterIndex];

          return (
            <Card
              key={index}
              characterImg={currentCharacterImg}
              isCardClicked={isCardClicked}
              handleCardClick={handleCardClick}
              handleDoShuffleCards={handleDoShuffleCards}
            />
          );
        })}
      </CardsContainer>
      <Scoreboard hasGameStarted={hasGameStarted} {...scores} />
    </div>
  );
};

export default Gameboard;
