import React from 'react'

const LibrarySong = ({
  song, songs, currentSong, 
  setCurrentSong, id, audioRef, isPlaying, setIsPlaying }) => {

  
  const songSelectHandler = async () => {
    await setCurrentSong(song)
    audioRef.current.play();
    setIsPlaying(true)
  }
  
  return (
    <div className='library-song' onClick={songSelectHandler}>
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