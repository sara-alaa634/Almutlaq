import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause } from "react-icons/fa";
import "../../Assets/Css/Chat.css";

// Enhanced Voice Message Player component with fixed audio handling
const VoiceMessagePlayer = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    
    try {
      if (isPlaying) {
        await audio.pause();
      } else {
        // Reset the time if the audio has ended
        if (audio.currentTime === audio.duration) {
          audio.currentTime = 0;
        }
        await audio.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      // console.error('Audio playback error:', error);
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="d-flex align-items-center gap-3 p-2">
      <button 
        onClick={togglePlay} 
        className="btn p-2 rounded-circle sc-1-bg text-white"
        style={{ minWidth: '32px', height: '32px' }}
      >
        {isPlaying ? <FaPause size={12}/> : <FaPlay size={12}/>}
      </button>
      
      <div className="flex-grow-1">
        <input
          ref={progressBarRef}
          type="range"
          className="form-range"
          min="0"
          max="100"
          value={(currentTime / duration) * 100 || 0}
          onChange={handleProgressChange}
        />
        <div className="d-flex justify-content-between small text-muted">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
      />
    </div>
  );
};
export default VoiceMessagePlayer