import { useState } from 'react';
import bgVideo from './assets/videos/bgvideo.mp4';
import bgAudioMP3 from './assets/audios/chainsaw-man-audio.mp3';
import bgAudioOGG from './assets/audios/chainsaw-man-audio.ogg';
import bgAudioWAV from './assets/audios/chainsaw-man-audio.wav';

function App() {
  const [isVolumeOn, setIsVolumeOn] = useState(false);

  const handleVolumeClick = () => {
    (isVolumeOn) ? setIsVolumeOn(false) : setIsVolumeOn(true);
  }

  return (
    <div className='fixed top-0 left-0 h-full w-full'>
      <div className='absolute top-0 left-0 h-full w-full -z-10'>
        <video className='h-full w-full object-cover' autoPlay loop muted={!isVolumeOn}>
          <source src={bgVideo} type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
      </div>
      <audio className='hidden' controls>
        <source src={bgAudioMP3} type="audio/mpeg"/>
        <source src={bgAudioOGG} type="audio/ogg"/>
        <source src={bgAudioWAV} type="audio/wav"/>
        Your browser does not support the audio element.
      </audio>
      <div className='max-w-full min-h-full grid grid-rows-[80px_1fr_80px] justify-items-center items-center'>
        <div className='relative w-min row-start-2 flex flex-col items-center gap-8'>
          <div>
            <h1 className='text-white text-9xl font-divergentes text-nowrap'>MEMORY CHAINSAW</h1>
            <h1 className='text-black text-9xl font-divergentes absolute
            top-1.5 left-1.5 whitespace-nowrap z-[-1] opacity-80 pointer-events-none'>MEMORY CHAINSAW</h1>
          </div>
          <div className='group'>
            <button className='transition-colors bg-zinc-200 w-[216px] h-[88px] rounded-lg shadow-lg
            border-4 border-black group-hover:border-white group-hover:bg-zinc-900'>
              <p className='transition-colors text-5xl font-extrabold text-black group-hover:text-white'>PLAY</p>
            </button>
          </div>
        </div>
        <div onClick={handleVolumeClick} className='group justify-self-start row-start-3
        transition-colors size-14 rounded-full shadow-md bg-white border-4 border-black
        m-3 flex justify-center items-center cursor-pointer hover:border-white
        hover:bg-zinc-900'>
          <svg className={`transition-colors size-9 ${isVolumeOn ? 'block' : 'hidden'}`}
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path className='transition-fill fill-black group-hover:fill-white' d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
          </svg>
          <svg className={`transition-colors size-9 ${isVolumeOn ? 'hidden' : 'block'}`}
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path className='transition-fill fill-black group-hover:fill-white' d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default App;
