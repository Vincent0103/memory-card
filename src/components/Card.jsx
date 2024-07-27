import { useEffect, useState } from 'react';
import Tilt from 'react-parallax-tilt';

const Card = () => {
  const [characterImgs, setCharacterImgs] = useState({
    jpg: null,
    webp: null,
  });
  const denjiId = 170732;

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/characters/${denjiId}/full`);
        let data = await response.json();
        data = data.data;
        setCharacterImgs({
          jpg: data.images.jpg.image_url,
          webp: data.images.webp.image_url
        });
      } catch (error) {
        console.error('Could not fetch character: ', error);
      }
    }

    fetchCharacter();
  }, []);

  return (
    <div className='row-start-2'>
      <Tilt glareEnable={true} glareMaxOpacity={0.8} glareColor="#ffffff" glarePosition="bottom" glareBorderRadius='6px'>
        <div className="w-48 h-72 rounded-md shadow-lg bg-red-100 overflow-hidden">
          <picture>
            <source srcSet={characterImgs.webp} type='image/webp' />
            <img className='h-full w-full object-cover' src={characterImgs.jpg} alt="" />
          </picture>
        </div>
      </Tilt>
    </div>
  )
}

export default Card;

// use jikan api to query characters
