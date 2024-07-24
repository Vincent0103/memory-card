import { useRef } from 'react';
import bgVideo from './assets/videos/bgvideo.mp4';
import bgAudioMP3 from './assets/audios/chainsaw-man-audio.mp3';
import bgAudioOGG from './assets/audios/chainsaw-man-audio.ogg';
import bgAudioWAV from './assets/audios/chainsaw-man-audio.wav';

function App() {
  const videoRef = useRef(null);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.pause) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }

  return (
    <div className='fixed top-0 left-0 h-full w-full'>
      <div className='absolute top-0 left-0 h-full w-full -z-10'>
        <video ref={videoRef} onClick={handleVideoClick} className='h-full w-full object-cover' autoPlay loop muted>
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
      <div className='max-w-full min-h-full grid grid-rows-[1fr_min-content] justify-items-center items-center'>
        <div className='relative w-min'>
          <h1 className='text-white text-9xl font-divergentes text-nowrap'>MEMORY CHAINSAW</h1>
          <h1 className='text-black text-9xl font-divergentes absolute
          top-1.5 left-1.5 whitespace-nowrap z-[-1] opacity-80 pointer-events-none'>MEMORY CHAINSAW</h1>
        </div>
        <div className='size-16 rounded-full shadow-md bg-white justify-self-start m-4'>
          
        </div>
      </div>
    </div>
  )
}

export default App;
