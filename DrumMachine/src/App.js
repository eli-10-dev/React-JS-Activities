import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState("");

  const playAudio = (e) => {
    setDisplay(e.currentTarget.id);
    e.currentTarget.querySelector("audio").play();
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      const audio = document.getElementById(e.key.toUpperCase());
      if (audio) {
        const pad = audio.parentElement;
        pad.classList.add("active");
        audio.currentTime = 0;
        audio.play();
        setDisplay(pad.id);
  
        setTimeout(() => {
          pad.classList.remove("active");
        }, 200); 
      }
    };
  
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="body flex-center">

      <div id="drum-machine" className="flex-center">
  
        <p>DRUM MACHINE</p>

        <div className="display-container flex-center">
          <div id="display" className="flex-center">{display}</div>
        </div>

        <div className="drumpad-container">
          <div className="drum-pad heater_1" id="Heater 1" onClick={playAudio}>
            Q
            <audio className="clip" id="Q" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3">
            </audio>
          </div>

          <div className="drum-pad heater_2" id="Heater 2" onClick={playAudio}> 
            W
            <audio className="clip" id="W" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3">
            </audio>
          </div>

          <div className="drum-pad heater_3" id="Heater 3" onClick={playAudio}>
            E
            <audio className="clip" id="E" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3">
            </audio>
          </div>

          <div className="drum-pad heater_4" id="Heater 4" onClick={playAudio}>
            A
            <audio className="clip" id="A" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3">
            </audio>
          </div>

          <div className="drum-pad clap" id="Clap" onClick={playAudio}>
            S
            <audio className="clip" id="S" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3">
            </audio>
          </div>

          <div className="drum-pad open_hh" id="Open-HH" onClick={playAudio}>
            D
            <audio className="clip" id="D" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3">
            </audio>
          </div>

          <div className="drum-pad kick_n_hat" id="Kick-n'-Hat" onClick={playAudio}>
            Z
            <audio className="clip" id="Z" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3">
            </audio>
          </div>

          <div className="drum-pad kick" id="Kick" onClick={playAudio}>
            X
            <audio className="clip" id="X" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3">
            </audio>
          </div>

          <div className="drum-pad closed_hh" id="Closed-HH" onClick={playAudio}>
            C
            <audio className="clip" id="C" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3">
            </audio>
          </div>
        </div>

      </div>

    </div>
  );
}

export default App;