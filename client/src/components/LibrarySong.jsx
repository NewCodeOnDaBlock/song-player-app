import React from 'react';
import { playAudio } from "../play";



const LibrarySong = ({
  name,
  artist,
  cover,
  id,
  setCurrentSong,
  songs,
  audioRef,
  isPlaying,
  setSongs,
  active,
  song,
  setIsPlaying,
}) => {

  
  const songSelectHandler = async () => {
    await setCurrentSong(song)
    audioRef.current.play();
    setIsPlaying(true)  

    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true
        };
      
    } else {
        return {
          ...song,
          active: false

        };
      }
    });
    setSongs(newSongs);
    
    //Play audio
    playAudio(isPlaying, audioRef);
  }
  
  return (
    <div className={`library-song ${song.active ? 'selected' : ''}`} onClick={songSelectHandler}>
      <img
        src={song.cover}
        alt="song-cover"
        className='song-library-cover'
      />
      <div className="library-song-info">
        <h3>{song.name}</h3>
        <h3>{song.artist}</h3>
      </div>
    </div>
  )
}

export default LibrarySong