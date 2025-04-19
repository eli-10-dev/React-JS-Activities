import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [computationArray, setComputationArray] = useState([]);
  const [computationDisplay, setComputationDisplay] = useState("0");
  const [prevElementIsOperator, setprevElementIsOperator] = useState(false);
  const [justEvaluated, setJustEvaluated] = useState(false);

  const handleClick = (e) => {
    const value = e.target.getAttribute("value");
    const className = e.target.getAttribute("class");
  
    if (className === "clear") {
      setComputationDisplay("0");
      setComputationArray([]);
      setprevElementIsOperator(false);
      setJustEvaluated(false);
      return;
    }
  
    if (className === "num") {
      if (value === "." && computationDisplay.includes(".")) return;
  
      if (justEvaluated) {
        setComputationDisplay(value);
        setComputationArray([]);
        setJustEvaluated(false);
      } else if (prevElementIsOperator) {
        // Continue a negative number after an operator
        setComputationDisplay(value);
      } else {
        setComputationDisplay((prev) =>
          prev === "0" || prev === "." ? value : prev + value
        );
      }
  
      setprevElementIsOperator(false);
      return;
    }
  
    if (className === "operator") {
      let newArray = [...computationArray];
  
      if (justEvaluated) {
        newArray = [computationDisplay];
        setJustEvaluated(false);
      } else if (!prevElementIsOperator) {
        newArray.push(computationDisplay);
      }
  
      const last = newArray[newArray.length - 1];
      const secondLast = newArray[newArray.length - 2];
  
      if (value === "=") {
        try {
          const expression = newArray.join("");
          const result = eval(expression);
          setComputationDisplay(result.toString());
          setComputationArray([...newArray, value]);
          setJustEvaluated(true);
          setprevElementIsOperator(false);
        } catch {
          setComputationDisplay("Error");
        }
        return;
      }
  
      // Handle operator stacking
      if (prevElementIsOperator) {
        // Case: last was operator, new is "-" → allow: e.g., * -
        if (value === "-" && last !== "-") {
          newArray.push(value);
        } else {
          // Replace last operator(s) with the new one
          if (["+", "-", "*", "/"].includes(last)) {
            newArray.pop(); // remove last
            if (["+", "-", "*", "/"].includes(secondLast)) {
              newArray.pop(); // remove second last if also operator (double ops)
            }
          }
          newArray.push(value);
        }
      } else {
        newArray.push(value);
      }
  
      setComputationArray(newArray);
      setComputationDisplay(value);
      setprevElementIsOperator(true);
    }
  };
  
  
  useEffect(() => {
    console.log("Computation Array: ", computationArray);
  }, [computationArray]);

  return (
    <div className="body flex-center">

      <div className="calculator-body">

        <div id="display-container">
          <div id="calculation-display">{computationArray.join("")}</div>
          <div id="display">{computationDisplay}</div>
        </div>

        <div className="numpad">

          <div id="clear" className="clear" value="clear" onClick={handleClick}>AC</div>
          <div id="divide" className="operator" value="/" onClick={handleClick}>/</div>
          <div id="multiply" className="operator" value="*" onClick={handleClick}>X</div>
          <div id="seven" className="num" value="7" onClick={handleClick}>7</div>
          <div id="eight" className="num" value="8" onClick={handleClick}>8</div>
          <div id="nine" className="num" value="9" onClick={handleClick}>9</div>
          <div id="subtract" className="operator" value="-" onClick={handleClick}>-</div>
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
