import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {   
  faAngleLeft,
  faAngleRight,
  faPause } from '@fortawesome/free-solid-svg-icons'
import Lottie from 'lottie-react';
import { playAudio } from '../play';

const Player = ({
  SpaceMan,
  PlayButton,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  currentSong,
  songs,
  setCurrentSong,
  setSongs
}) => {

  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    )
  }

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({...songInfo, currentTime: e.target.value})
  }

  const playSongHandler = (e) => {
    if(isPlaying){
      audioRef.current.pause()
      setIsPlaying(!isPlaying)
    } else {
      audioRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }

  const skipTrackHandler = async (direction) => {
    console.log('skiphandler triggered');
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
        playAudio(isPlaying, audioRef);
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div className='player-container'>
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <Lottie loop={true} animationData={SpaceMan} className='spaceman'/>
        <input type="range" min={0} max={songInfo.duration || 0} value={songInfo.currentTime} onChange={dragHandler}/>
        <p>{getTime(songInfo.duration || 0)}</p>
      </div>
      <div className="play-control">
      <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
      {
          !isPlaying ? 
          <Lottie loop={true} animationData={PlayButton} className='play-button' onClick={playSongHandler} />
          :
          <FontAwesomeIcon className='pause-btn' icon={faPause} onClick={playSongHandler}/> 
      }
      <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
          onClick={() => skipTrackHandler("skip-forward")}
        />
      </div>
    </div>
  )
}

export default Player
