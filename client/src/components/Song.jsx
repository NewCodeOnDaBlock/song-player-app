import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-react';


const Song = ({currentSong, isPlaying, AudioVisual}) => {
  const imageRef = useRef();

  useEffect(() => {
    const running = imageRef.current.style.animationPlayState === 'running';
    imageRef.current.style.animationPlayState = running ? 'paused' : 'running';
  }, [isPlaying])


  return (
    <div className='song-container'>
        <img ref={imageRef} src={currentSong.cover} alt="song-cover" className='song-cover'/>
      <h2 style={{fontSize: '16px', fontWeight: '890'}}>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
      {
        isPlaying ? 
          <Lottie loop={true} animationData={AudioVisual} className='audio-visual'/>
          :
          ''
      }
    </div> 
  )
}

export default Song