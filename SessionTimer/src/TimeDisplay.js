import './App.css';

function TimeDisplay({breakTime, formatTime, countDown, audioRef, startOrPauseTimer, isRunning, resetTimer}){

    return(
        <section className="timer center">
        <div className="timer-display">
          <div id="timer-label">{breakTime ? "Break Time" : "Study Time"}</div>
          <div id="time-left" className="center">{formatTime(countDown)}</div>
          <audio id="beep" ref={audioRef} src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg" preload="auto"/>
        </div>

        <div className="buttons">
          <div id="start_stop" onClick={startOrPauseTimer} className="center" style={{ color: breakTime ? "rgba(56,133,138,255)" : "rgba(186,73,73,255)" }}>{isRunning ? "Stop" : "Start"}</div>
          <div id="reset" onClick={resetTimer} className="center" style={{ color: breakTime ? "rgba(56,133,138,255)" : "rgba(186,73,73,255)" }}>Reset</div>
        </div>
      </section>
    );
}

export default TimeDisplay;