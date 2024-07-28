import { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";

const Card = ({ handleCardClick, isCardClicked, characterId }) => {
  const [characterImgs, setCharacterImgs] = useState({
    name: null,
    jpg: null,
    webp: null,
  });

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(
          // use jikan api to query characters
          `https://api.jikan.moe/v4/characters/${characterId}/full`
        );
        let data = await response.json();
        data = data.data;
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
    <div className="row-start-2" onClick={handleCardClick}>
      <Tilt
        glareEnable={!isCardClicked}
        glareMaxOpacity={.5}
        glareColor="#ffffff"
        glarePosition="bottom"
        glareBorderRadius="6px"
      >
        <div className="relative">
          <div className={`w-48 h-72 rounded-md shadow-lg bg-red-100 overflow-hidden border-2 border-black
          relative preserve-3d transition-transform-slowly ${isCardClicked ? "return-down" : ""}
          hide-backface`}>
            <picture>
              <source srcSet={characterImgs.webp} type="image/webp" />
              <img
                className="h-full w-full object-cover"
                src={characterImgs.jpg}
                alt={`Picture of ${characterImgs.name}`}
              />
            </picture>
          </div>
          <div className={`w-48 h-72 rounded-md shadow-lg bg-gradient-to-br from-zinc-700 to-zinc-900 overflow-hidden border-2 border-black
          absolute top-0 left-0 preserve-3d transition-transform-slowly ${isCardClicked ? "" : "return-down"}
          hide-backface`}>
            <h1 className="font-divergentes text-8xl absolute top-[90px] left-[60px] z-[4] text-white">M</h1>
            <h1 className="font-divergentes text-8xl absolute top-[95px] left-[65px] z-[3] text-black/50">M</h1>
            <h1 className="font-divergentes text-8xl absolute top-[120px] left-[95px] z-[2] text-white">C</h1>
            <h1 className="font-divergentes text-8xl absolute top-[125px] left-[100px] z-[1] text-black/50">C</h1>
          </div>
        </div>
      </Tilt>
    </div>
  );
};

export default Card;
