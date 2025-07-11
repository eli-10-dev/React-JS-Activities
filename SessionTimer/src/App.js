import { useState, useEffect, useRef } from 'react';
import './App.css';
import TimeSettings from './TimeSettings.js';
import TimeDisplay from './TimeDisplay.js';

function App() {
  const [studyTime, setStudyTime] = useState(25); // DEFAULT=25
  const [restTime, setRestTime] = useState(5); // DEFAULT=5
  const [countDown, setCountDown] = useState(studyTime * 60); // default to 60s
  const [isRunning, setIsRunning] = useState(false);
  const [breakTime, setBreakTime] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false); // sets userInteracted to true when start button is clicked
  const [shouldPlaySound, setShouldPlaySound] = useState(false);

  const audioRef = useRef(null);         // to access the <audio> DOM element
  // const firstPlayRef = useRef(false);     // flag to avoid playing sound first time

  const startOrPauseTimer = () => {
    if (!userInteracted) {
      setUserInteracted(true);
  
      // This guarantees the audio will be "unlocked" with direct user click
      audioRef.current.play().then(() => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }).catch((err) => {
        console.warn("Audio unlock failed:", err);
      });
    }
  
    setIsRunning(prev => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setBreakTime(false);
    setShouldPlaySound(false);
    setStudyTime(25); // DEFAULT=25
    setRestTime(5); // DEFAULT=5
    setCountDown(25 * 60);
    // firstPlayRef.current = true; // reset the firstPlay flag (The ring will not play if it is the first time playing the session)
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };
  
  const timeIncrement = (e) => {
    const buttonId = e.target.id;
    if (buttonId === "break-increment"){
      setRestTime(prev => prev < 60 ? prev + 1 : prev);
    } else {
      setStudyTime(prev => prev < 60 ? prev + 1 : prev);
    }
  };

  const timeDecrement = (e) => {
    const buttonId = e.target.id;
    if (buttonId === "break-decrement"){
      setRestTime(prev => prev > 1 ? prev - 1 : prev);
    } else {
      setStudyTime(prev => prev > 1 ? prev - 1 : prev);
    }
  };
  
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setCountDown(prev => {
          if (prev <= 0) {
            if (userInteracted) {
              setShouldPlaySound(true); // Flag to play audio in another effect
            }
          
            if (!breakTime) {
              setBreakTime(true);
            } else {
              setBreakTime(false);
            }

            // firstPlayRef.current = false;
            return breakTime ? studyTime * 60 : restTime * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, breakTime, restTime, studyTime]);

  useEffect(() => {
    if (shouldPlaySound && audioRef.current) {
      audioRef.current.play()
        .catch(err => console.warn("Audio playback blocked:", err));
      setShouldPlaySound(false); // Reset flag after play attempt
    }
  }, [shouldPlaySound]);
  
  useEffect(() => { 
    if (!isRunning && !breakTime) {
      setCountDown(studyTime * 60);
    }
  }, [studyTime, breakTime]);

  return (
    <div className="body" style={{ backgroundColor: breakTime ? "rgba(56,133,138,255)" : "rgba(186,73,73,255)" }}>
      <div className="sections-container center" style={{ backgroundColor: breakTime ? "rgba(76,145,150,255)" : "rgba(193,92,92,255)" }}>
        <h1 className="app-name">Study Timer</h1>
        <TimeSettings 
        restTime={restTime}
        studyTime={studyTime}
        timeIncrement={timeIncrement}
        timeDecrement={timeDecrement}
        />
        <TimeDisplay
        breakTime={breakTime}
        formatTime={formatTime}
        countDown={countDown}
        audioRef={audioRef}
        startOrPauseTimer={startOrPauseTimer}
        isRunning={isRunning}
        resetTimer={resetTimer}
        />
      </div>
    </div>
  );
}

export default App;