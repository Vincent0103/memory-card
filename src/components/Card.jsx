import { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";

const CardsContainer = ({ hasGameStarted, children }) => {
  const onGameStartTransitioner = !hasGameStarted
    ? "translate-z-back opacity-0 pointer-events-none -z-10"
    : "absolute translate-z-idle opacity-1";

  return (
    <div
      className={`${onGameStartTransitioner} row-start-2 flex flex-wrap justify-center gap-5 max-w-[50%] transition-slide`}
    >
      {children}
    </div>
  );
};

const Card = ({ characterId }) => {
  const [characterImgs, setCharacterImgs] = useState({
    name: null,
    jpg: null,
    webp: null,
  });

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/characters/${characterId}/full`
        );
        let data = await response.json();
        data = data.data;
        console.log(data);
        setCharacterImgs({
          name: data.name,
          jpg: data.images.jpg.image_url,
          webp: data.images.webp.image_url,
        });
      } catch (error) {
        console.error("Could not fetch character: ", error);
      }
    };

    fetchCharacter();
  }, []);

  return (
    <div className="row-start-2">
      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.8}
        glareColor="#ffffff"
        glarePosition="bottom"
        glareBorderRadius="6px"
      >
        <div className="w-48 h-72 rounded-md shadow-lg bg-red-100 overflow-hidden border-2 border-black">
          <picture>
            <source srcSet={characterImgs.webp} type="image/webp" />
            <img
              className="h-full w-full object-cover"
              src={characterImgs.jpg}
              alt={`Picture of ${characterImgs.name}`}
            />
          </picture>
        </div>
      </Tilt>
    </div>
  );
};

const MemoryGameContainer = ({ hasGameStarted }) => {
  const characterIds = [170732, 170733, 170734, 170735, 174749, 174750, 174748];

  return (
    <CardsContainer hasGameStarted={hasGameStarted}>
      {characterIds.map((id, index) => (
        <Card key={index} characterId={id} />
      ))}
    </CardsContainer>
  );
};

export default MemoryGameContainer;

// use jikan api to query characters
