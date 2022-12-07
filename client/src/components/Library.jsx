import React from 'react'
import LibrarySong from './LibrarySong'

const Library = ({ songs, setCurrentSong, currentSong, audioRef, isPlaying, setIsPlaying, libraryStat }) => {
  return (
    <div className={`library-container ${libraryStat ? 'active-library' : ""}`}>
      <h2>Library</h2>
      <div className="library-of-songs">
        {songs.map((song) => (
          <LibrarySong
            audioRef={audioRef}
            songs={songs}
            song={song}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            key={song.id}
          />
        ))}
      </div>
    </div>
  )
}

export default Library
