import { useState, useRef, useCallback } from "react";
import MainMenu from "./components/Menu/MainMenu";
import BgVideo from "./components/BgVideo";
import SettingBtn from "./components/SettingBtn";
import Gameboard from "./components/Gameboard/Gameboard";
import AudioJSX from "./components/utils/Audio";
import btnClickAudioMP3 from "./assets/audios/btn-click.mp3";
import btnClickAudioOGG from "./assets/audios/btn-click.ogg";
import btnClickAudioWAV from "./assets/audios/btn-click.wav";
import easyMusicMP3 from "./assets/audios/music/buddy.mp3";
import easyMusicWAV from "./assets/audios/music/buddy.wav";


function App() {
  const prevMusicRef = useRef(null);
  const musicRef = useRef(null);
  const soundEffectAudioRef = useRef(null);
  const [isSoundEffectOn, setIsSoundEffectOn] = useState(true);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [musicSources, setMusicSources] = useState(null);

  const [hasGameStarted, setHasGameStarted] = useState(false);

  const handleMusicClick = useCallback(() => {
    setIsMusicOn(!isMusicOn);
    console.log(isSoundEffectOn)
    if (isSoundEffectOn) soundEffectAudioRef.current.play();
  }, [isSoundEffectOn, isMusicOn]);

  const handleSoundEffectClick = useCallback(() => {
    setIsSoundEffectOn((prev) => !prev);
  }, []);

  const handleGameStart = (hasGameEnded) => {
    setHasGameStarted(!hasGameEnded);
  };

  const handleMusicDifficulty = (difficulty) => {
    if (difficulty === 'easy') {
      setMusicSources([easyMusicMP3, easyMusicWAV]);
    }
  }

  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <AudioJSX
        audioRef={soundEffectAudioRef}
        audioFileUrls={[btnClickAudioMP3, btnClickAudioWAV, btnClickAudioOGG]}
        isOn={isSoundEffectOn}
      />
      <AudioJSX
        audioRef={musicRef}
        audioFileUrls={musicSources}
        isOn={isMusicOn}
        hasGameStarted={hasGameStarted}
        hasLoop={true}
        isHandlingMusic={true}
      />
      <BgVideo isMusicOn={isMusicOn} hasGameStarted={hasGameStarted} />
      <div className="grid grid-rows-[80px_1fr_80px] h-full w-full justify-items-center items-center">
        <MainMenu
          soundEffectAudioRef={soundEffectAudioRef}
          isSoundEffectOn={isSoundEffectOn}
          handleGameStart={handleGameStart}
          hasGameStarted={hasGameStarted}
          setIsMusicOn={setIsMusicOn}
          handleMusicDifficulty={handleMusicDifficulty}
        />
        <Gameboard
          hasGameStarted={hasGameStarted}
          handleGameStart={handleGameStart}
          isSoundEffectOn={isSoundEffectOn}
        />
        <div className="row-start-3 justify-self-start ml-1 flex">
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
}

export default App;
