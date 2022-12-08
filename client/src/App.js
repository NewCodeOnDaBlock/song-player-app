import React, {useState, useRef } from 'react';
import Player from './components/Player';
import Song from './components/Song';
import Lottie from 'lottie-react';
import './styles/app.scss';
import BackgroundAnimation from './lottie/BackgroundAnimation.json';
import MainBackground from './lottie/Pre-comp 1.json';
import SpaceMan from './lottie/127848-happy-spaceman.json';
import AudioVisual from './lottie/AudioVisual.json';
import PlayButton from './lottie/play.json';
import Library from './components/Library';
import Nav from './components/Nav';
import musicData from './utils';
import  {playAudio} from './play';

function App({loop,animationData }) {
  const audioRef = useRef(null);
  const [libraryStat, setLibraryStat] = useState(false);
  const [songs, setSongs] = useState(musicData());
  const [currentSong, setCurrentSong] = useState(songs[1])
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0
  })

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    playAudio(isPlaying, audioRef);
    return;
  };

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({...songInfo, currentTime: current, duration: duration})
  }

  return (
    <div className='main-container'>
      <Lottie loop={true} animationData={BackgroundAnimation} className='player-animation'/>
      <div className="app">
      <Lottie loop={true} animationData={MainBackground} className='main-background'/>
      <Nav libraryStat={libraryStat} setLibraryStat={setLibraryStat}/>
        <Song
          currentSong={currentSong} 
          isPlaying={isPlaying}
          AudioVisual={AudioVisual}
        />
        <Player
          audioRef={audioRef}
          songInfo={songInfo}
          songs={songs}
          setSongs={setSongs}
          setCurrentSong={setCurrentSong}
          setSongInfo={setSongInfo}
          timeUpdateHandler={timeUpdateHandler}
          PlayButton={PlayButton}
          currentSong={currentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          SpaceMan={SpaceMan}
          />
      </div>
      <Library
        audioRef={audioRef}
        songs={songs}
        setSongs={setSongs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        libraryStat={libraryStat}
      />
      <audio
        src={currentSong.audio}
        ref={audioRef}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={songEndHandler}
      />
    </div>
  );
}

export default App;
