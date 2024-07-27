import { useState, useRef, useCallback } from "react";

import MenuTitle from "./MenuTitle";
import PlayBtn from "./PlayBtn";
import SettingBtn from "./SettingBtn";
import BgVideo from "./BgVideo";
import SoundEffectAudio from "./SoundEffectAudio";

const MainMenu = () => {
  const soundEffectAudioRef = useRef(null);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [isSoundEffectOn, setIsSoundEffectOn] = useState(true);

  const handleMusicClick = useCallback(() => {
    setIsMusicOn((prev) => !prev);
    if (isSoundEffectOn) soundEffectAudioRef.current.play();
  }, [isSoundEffectOn]);

  const handlePlayBtnClick = useCallback(() => {
    if (isSoundEffectOn) soundEffectAudioRef.current.play();
  }, [isSoundEffectOn]);

  const handleSoundEffectClick = useCallback(() => {
    setIsSoundEffectOn((prev) => !prev);
  }, []);

  return (
    <div className="fixed top-0 left-0 h-full w-full flex justify-center">
      <BgVideo isMusicOn={isMusicOn} />
      <SoundEffectAudio audioRef={soundEffectAudioRef} />
      <div className="max-w-[1536px] w-[1536px] grid grid-rows-[80px_1fr_80px] justify-items-center items-center">
        <div className="relative w-min row-start-2 flex flex-col items-center gap-8">
          <MenuTitle />
          <PlayBtn clickHandler={handlePlayBtnClick} />
        </div>
        <div className="justify-self-start row-start-3 flex">
          <SettingBtn
            clickHandler={handleSoundEffectClick}
            isOn={isSoundEffectOn}
            onPath={
              "M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
            }
            offPath={
              "M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"
            }
          />
          <SettingBtn
            clickHandler={handleMusicClick}
            isOn={isMusicOn}
            onPath={
              "M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17S7.79 21 10 21 14 19.21 14 17V7H18V3H12Z"
            }
            offPath={
              "M4.27 3L3 4.27L12 13.27V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17S7.79 21 10 21 14 19.21 14 17V15.27L19.73 21L21 19.73L4.27 3M14 7H18V3H12V8.18L14 10.18Z"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
