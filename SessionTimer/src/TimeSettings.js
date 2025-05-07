import './App.css';

function TimeSettings({restTime, studyTime, timeIncrement, timeDecrement}){

    return (
        <section className="time-settings">
            <div className="break-time">
                <div id="break-label">Rest Time</div>
                <div id="break-length">{restTime}</div>
    
                <div className="time-adjust center">
                  <div id="break-increment" onClick={timeIncrement}>+</div>
                  <div id="break-decrement" onClick={timeDecrement}>-</div>
                </div>
            </div>
    
            <div className="session-time">
                <div id="session-label">Study Time</div>
                <div id="session-length">{studyTime}</div>
                <div className="time-adjust center">
                  <div id="session-increment" onClick={timeIncrement}>+</div>
                  <div id="session-decrement" onClick={timeDecrement}>-</div>
                </div>
            </div>
    
        </section>
    );
}

export default TimeSettings;