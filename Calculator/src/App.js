import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  return (
    <div className="body flex-center">

      <div className="calculator-body">

        <div id="display-container">
          <div id="calculation-display">{computationArray.join(" ")}</div>
          <div id="display">{userInput}</div>
        </div>

        <div className="numpad">

          <div id="clear" className="clear" value="clear" onClick={handleClick}>AC</div>
          <div id="divide" className="operator" value="/" onClick={handleClick}>/</div>
          <div id="multiply" className="operator" value="x" onClick={handleClick}>X</div>
          <div id="seven" className="num" value="7" onClick={handleClick}>7</div>
          <div id="eight" className="num" value="8" onClick={handleClick}>8</div>
          <div id="nine" className="num" value="9" onClick={handleClick}>9</div>
          <div id="subtract" value="-" onClick={handleClick}>-</div>
          <div id="four" className="num" value="4" onClick={handleClick}>4</div>
          <div id="five" className="num" value="5" onClick={handleClick}>5</div>
          <div id="six" className="num" value="6" onClick={handleClick}>6</div>
          <div id="one" className="num" value="1" onClick={handleClick}>1</div>
          <div id="two" className="num" value="2" onClick={handleClick}>2</div>
          <div id="three" className="num" value="3" onClick={handleClick}>3</div>
          <div id="add" className="operator" value="+" onClick={handleClick}>+</div>
          <div id="zero" className="num" value="0" onClick={handleClick}>0</div>
          <div id="decimal" className="num" value="." onClick={handleClick}>.</div>
          <div id="equals" className="operator" value="="  onClick={handleClick}>=</div>

        </div>

      </div>

    </div>
  );
}

export default App;
