import { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";

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

export default Card;
