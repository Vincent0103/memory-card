import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { produce } from "immer";
import Card from "./Card";
import methodsExpension from "../utils/utils";
import CardsContainer from "./CardsContainer";
import Scoreboard from "./Scoreboard";
import Audio from "../utils/Audio";
import cardsShuffledMP3 from "../../assets/audios/cards-shuffled.mp3";
import cardsShuffledWAV from "../../assets/audios/cards-shuffled.wav";
import DifficultyDisplayer from "./DifficultyDisplayer";

methodsExpension();
const Gameboard = ({ gameState, handleGameState, isSoundEffectOn }) => {
  const exceedingElementRef = useRef(null);
  const cardsShuffleAudioRef = useRef(null);

  // The ids are retrieved from theAnimeList website api
  const characterIds = useMemo(
    () => [
      170732, 170733, 170734, 170735, 174749, 174750, 174748, 174744, 174746,
      174745, 170765, 222935, 184168, 174751, 177862, 219634, 174747, 184111,
      174743, 184169, 199840, 199843,
    ],
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

  const [difficultyData, setDifficultyData] = useState({
    difficulty: "easy",
    visibleCards: 4,
  });

  useEffect(() => {
    const clickedIds = [...clickedCharacterIds];
    const unclickedIds = characterIds.filter(
      (id) => !clickedCharacterIds.includes(id)
    );

    const popCharacters = (n, array) => {
      const result = [];
      const loopCondition = n > array.length ? array : n;
      for (let i = 0; i < loopCondition; i += 1) {
        const index = Math.floor(Math.random() * array.length);
        result.push(array.splice(index, 1)[0]);
      }
      return result;
    };

    const getNewShuffledCharacterIds = () => {
      // for easy and medium
      let desiredNumber = 2;

      if (difficultyData.difficulty === "hard") desiredNumber = 1;

      const unclickedShuffledIds = popCharacters(desiredNumber, unclickedIds);
      const clickedShuffledIds = popCharacters(
        clickedCharacterIds.length,
        clickedIds
      );

      let compensatedShuffledIds = [];

      const totalIdsLength =
        clickedShuffledIds.length + unclickedShuffledIds.length;

      if (totalIdsLength <= difficultyData.visibleCards) {
        compensatedShuffledIds = popCharacters(
          difficultyData.visibleCards - totalIdsLength,
          unclickedIds
        );
      } else {
        clickedShuffledIds.splice(
          0,
          totalIdsLength - difficultyData.visibleCards
        );
      }

      return [
        ...unclickedShuffledIds,
        ...compensatedShuffledIds,
        ...clickedShuffledIds,
      ].shuffle();
    };

    if (doShuffleCards) {
      const newShuffledCharacterIds = getNewShuffledCharacterIds();
      setShuffledCharacterIds(newShuffledCharacterIds);
      setDoShuffleCards(false);
    }
  }, [
    characterIds,
    clickedCharacterIds,
    difficultyData.difficulty,
    difficultyData.visibleCards,
    doShuffleCards,
  ]);

  useEffect(() => {
    const hasNoCharacterData = (index) => {
      const characterData = characterImgs[index];

      if (!characterData) return false;
      return Object.entries(characterData)
        .filter(([key]) => key !== "id")
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
          });
        } else {
          console.error("Could not fetch character: ", error);
        }
      };

      const fetchData = async (retries, delay) => {
        try {
          const response = await fetch(
            // use jikan api to query characters
            `https://api.jikan.moe/v4/characters/${characterId}/full`
          );
          let data = await response.json();
          data = data.data;
          if (!data) {
            return retry(
              retries,
              delay,
              "Too many api calls, status code: 429"
            );
          }

          return data;
        } catch (error) {
          return retry(retries, delay, error);
        }
      };

      const index = characterImgs.findIndex(({ id }) => id === characterId);
      if (index === -1)
        console.error(
          `Could not fetch character with a bad id: ${characterId}`
        );

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

  const handleDoShuffleCards = (canShuffleCards) => {
    setDoShuffleCards(canShuffleCards);
  };

  const handleDifficulty = useCallback(
    (resetDifficulty) => {
      const currentRounds = clickedCharacterIds.length + 1;
      let difficulty = null;
      let visibleCards = 0;
      if (resetDifficulty || (currentRounds >= 1 && currentRounds < 5)) {
        difficulty = "easy";
        // visibleCards = 4;
        visibleCards = 12;
      } else if (currentRounds >= 5 && currentRounds < 13) {
        difficulty = "medium";
        visibleCards = 7;
      } else if (currentRounds >= 13 && currentRounds < 22) {
        difficulty = "hard";
        visibleCards = 12;
      }

      setDifficultyData({ difficulty, visibleCards });
    },
    [clickedCharacterIds.length]
  );

  useEffect(() => {
    if (gameState.retried || gameState.home) {
      const dataObject = {
        started: true,
        ended: false,
        retried: false,
      };

      if (gameState.home) dataObject.started = false;

      handleGameState(dataObject);
      handleClickedCharacterIds();
      handleDoShuffleCards(true);
      handleScores(true);
      handleDifficulty(true);
    }
  }, [gameState.retried, gameState.home, handleDifficulty, handleGameState]);

  const handleCardClick = (animate, characterId) => {
    if (!animate) setIsCardClicked(false);
    if (isCardClicked) return;

    if (clickedCharacterIds.includes(characterId)) handleWinLose(true);
    else handleCorrectGuess(characterId);

    setIsCardClicked(true);
  };

  const handleCorrectGuess = (characterId) => {
    // +1 because the currently clicked character id isn't counted
    //  in the clickedCharacterIds array during the current render.
    const numberOfClickedCharacterIds = clickedCharacterIds.length + 1;

    if (numberOfClickedCharacterIds === characterIds.length) {
      handleWinLose(false);
      handleScores();
    } else {
      cardsShuffleAudioRef.current.play();
      handleClickedCharacterIds(characterId);
      handleScores(false);
      handleDifficulty();
    }
  };

  const handleWinLose = (hasLost) => {
    const dataObject = {
      ended: true,
    };
    if (!hasLost) dataObject.won = true;

    handleGameState(dataObject);
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

  const onGameStartTransitioner = !gameState.started
    ? "translate-z-back opacity-0 pointer-events-none"
    : "translate-z-idle opacity-1";

  return (
    <>
      <div
        ref={exceedingElementRef}
        className={`absolute row-start-2 ${onGameStartTransitioner} transition-slide
        grid grid-rows-[1fr_auto_1fr] gap-5 max-w-[1536px] mx-4`}
      >
        <Audio
          audioRef={cardsShuffleAudioRef}
          audioFileUrls={[cardsShuffledMP3, cardsShuffledWAV]}
          isOn={isSoundEffectOn}
        />
        <>
          <Scoreboard hasGameStarted={gameState.started} {...scores} />
          <CardsContainer>
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
                  currentRound={clickedCharacterIds.length + 1}
                />
              );
            })}
          </CardsContainer>
          <DifficultyDisplayer difficulty={difficultyData.difficulty} />
        </>
      </div>
    </>
  );
};

export default Gameboard;
