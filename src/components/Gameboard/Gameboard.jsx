import Card from "./Card";
import methodsExpension from "../utils";
import { useEffect, useMemo, useState } from "react";
import { produce } from "immer";


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

methodsExpension();
const Gameboard = ({ hasGameStarted }) => {
  // jikan api chainsaw man character ids
  const characterIds = useMemo(() => [170732, 170733, 170734, 170735, 174749, 174750, 174748], []);

  const [shuffledCharacterIds, setShuffledCharacterIds] = useState([]);
  const [characterImgs, setCharacterImgs] = useState([]);

  useEffect(() => {
    setShuffledCharacterIds(characterIds.shuffle());
    setCharacterImgs(characterIds.map((id) => ({ id, alt: null, jpg: null, webp: null })));
  }, [characterIds]);

  const handleCharacterImgs = (characterId, { name, jpg, webp }) => {
    setCharacterImgs(produce((draft) => {
      const entry = draft.find(({ id }) => id === characterId);
      Object.assign(entry, { name, jpg, webp })
    }));
  };


  return (
    <CardsContainer hasGameStarted={hasGameStarted}>
      {shuffledCharacterIds.map((id) => (
        <Card key={id} characterId={id} characterImgs={characterImgs}
        handleCharacterImgs={handleCharacterImgs} />
      ))}
    </CardsContainer>
  );
};

export default Gameboard;
