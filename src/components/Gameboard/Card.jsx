import { useEffect, useMemo, useState } from "react";
import Tilt from "react-parallax-tilt";

const Card = ({ characterImgs, handleCharacterImgs, characterId }) => {
  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        // use jikan api to query characters from chainsaw man anime
        const response = await fetch(
          `https://api.jikan.moe/v4/characters/${characterId}/full`
        );
        let data = await response.json();
        data = data.data;
        handleCharacterImgs(characterId, {
          name: data.name,
          jpg: data.images.jpg.image_url,
          webp: data.images.webp.image_url
        });
      } catch (error) {
        console.error("Could not fetch character: ", error);
      }
    };

    fetchCharacter();
  }, [characterImgs, handleCharacterImgs, characterId]);

  const currentCharacterImg = characterImgs.find(({ id }) => id === characterId);
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
            <source srcSet={currentCharacterImg.webp} type="image/webp" />
            <img
              className="h-full w-full object-cover"
              src={currentCharacterImg.jpg}
              alt={`Picture of ${currentCharacterImg.name}`}
            />
          </picture>
        </div>
      </Tilt>
    </div>
  );
};

export default Card;
