import { useEffect, useState, useRef } from "react";
import Tilt from "react-parallax-tilt";

const Card = ({ handleCardClick, isCardClicked, characterImg, handleDoShuffleCards }) => {
  return (
    <div className="row-start-2" onClick={() => handleCardClick(true, characterImg.id)}>
      <Tilt
        glareEnable={!isCardClicked}
        glareMaxOpacity={0.5}
        glareColor="#ffffff"
        glarePosition="bottom"
        glareBorderRadius="6px"
      >
        <div className="relative">
          <div
            className={`w-48 h-72 rounded-md shadow-sm bg-red-100 overflow-hidden border-2 border-black
          relative preserve-3d ${isCardClicked && "return-frontface-card"} hide-backface select-none`}
          onAnimationIteration={() => handleDoShuffleCards(true)}
          onAnimationEnd={() => handleCardClick(false)}
          >
            <picture>
              <source srcSet={characterImg.webp} type="image/webp" />
              <img
                className="h-full w-full object-cover"
                src={characterImg.jpg}
                alt={`Picture of ${characterImg.name}`}
              />
            </picture>
            <div className="absolute bottom-0 w-full h-[40%]
            bg-gradient-to-t from-zinc-950 to-zinc-950/0
            flex justify-center items-end">
              <h1 className="text-white text-nowrap mb-4">{characterImg.name || ''}</h1>
            </div>
          </div>
          <div
            className={`w-48 h-72 rounded-md shadow-sm bg-gradient-to-br from-zinc-700 to-zinc-900
          overflow-hidden border-2 border-black absolute top-0 left-0 preserve-3d
          ${isCardClicked && "return-backface-card"} hide-backface rotate-y-full
          pointer-events-none select-none`}
          >
            <h1
              className="font-divergentes text-8xl absolute top-[90px] left-[60px] z-[4]
              text-white"
            >
              M
            </h1>
            <h1
              className="font-divergentes text-8xl absolute top-[95px] left-[65px] z-[3]
               text-black/50"
            >
              M
            </h1>
            <h1
              className="font-divergentes text-8xl absolute top-[120px] left-[95px] z-[2]
            text-white"
            >
              C
            </h1>
            <h1
              className="font-divergentes text-8xl absolute top-[125px] left-[100px] z-[1]
            text-black/50"
            >
              C
            </h1>
          </div>
        </div>
      </Tilt>
    </div>
  );
};

export default Card;
