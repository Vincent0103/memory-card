import Tilt from "react-parallax-tilt";

const Card = ({
  handleCardClick,
  isCardClicked,
  characterImg,
  handleDoShuffleCards,
}) => {
  const hasCharacterImgLoaded = characterImg.img || characterImg.webp;

  return (
    <div
      className="row-start-2"
      onClick={() => handleCardClick(true, characterImg.id)}
    >
      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.5}
        glareColor="#ffffff"
        glarePosition="bottom"
        glareBorderRadius="6px"
      >
        <div className="relative">
          <div
            className={`w-48 h-72 max-2xl:w-32 max-2xl:h-48 rounded-md shadow-sm bg-gradient-to-br from-zinc-500 to-bg-zinc-800
            overflow-hidden border-2 border-black relative preserve-3d ${isCardClicked && "return-frontface-card"}
            hide-backface select-none`}
            onAnimationIteration={() => handleDoShuffleCards(true)}
            onAnimationEnd={() => handleCardClick(false)}
          >
            {hasCharacterImgLoaded && (
              <picture>
                <source srcSet={characterImg.webp} type="image/webp" />
                <img
                  className="h-full w-full object-cover"
                  src={characterImg.jpg}
                  alt={`Picture of ${characterImg.name}`}
                />
              </picture>
            )}
            <div
              className="absolute bottom-0 w-full h-[40%]
              bg-gradient-to-t from-zinc-950 to-zinc-950/0
              flex justify-center items-end"
            >
              <h1 className="text-white max-2xl:text-xs text-nowrap mb-4">
                {hasCharacterImgLoaded ? characterImg.name : "Loading..."}
              </h1>
            </div>
          </div>
          <div
            className={`w-48 h-72 max-2xl:w-32 max-2xl:h-48 rounded-md shadow-sm bg-gradient-to-br from-zinc-700 to-zinc-900
            overflow-hidden border-2 border-black absolute top-0 left-0 preserve-3d
            ${isCardClicked && "return-backface-card"} hide-backface rotate-y-full
            pointer-events-none select-none`}
          >
            <h1
              className="font-divergentes text-8xl max-2xl:text-6xl absolute
              top-[90px] left-[60px] max-2xl:top-[55px] max-2xl:left-[40px] z-[4] text-white/90"
            >
              M
            </h1>
            <h1
              className="font-divergentes text-8xl max-2xl:text-6xl absolute
              top-[95px] left-[65px] max-2xl:top-[58px] max-2xl:left-[43px] z-[3]
                text-black/50"
            >
              M
            </h1>
            <h1
              className="font-divergentes text-8xl max-2xl:text-6xl absolute
              top-[120px] left-[95px] max-2xl:top-[75px] max-2xl:left-[62px] z-[2] text-white/90"
            >
              C
            </h1>
            <h1
              className="font-divergentes text-8xl max-2xl:text-6xl absolute
              top-[125px] left-[100px] max-2xl:top-[78px] max-2xl:left-[65px] z-[1] text-black/50"
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
