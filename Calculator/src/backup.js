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
    return;
  }

  if (className === "num") {
    if (value === "." && computationDisplay.includes(".")) {
      return;
    }

    if (justEvaluated) {
      setComputationDisplay(value);
      setComputationArray([]);
      setJustEvaluated(false);
    } else if (prevElementIsOperator) {
      // Handle case for operators followed by a number, including the negative sign
      if (value === "-" && computationDisplay === "0") {
        setComputationDisplay(value);
      } else {
        // If it's not a negative sign, append the number
        setComputationDisplay(value);
      }
    } else {
      // For regular numbers, append them to the display
      setComputationDisplay((prev) => (prev === "0" || prev === "." ? value : prev + value));
    }
    setprevElementIsOperator(false);
  }

  if (className === "operator") {
    let newArray;

    if (justEvaluated) {
      newArray = [computationDisplay];
      setJustEvaluated(false);
    } else {
      newArray = [...computationArray, computationDisplay];
    }

    // Handle consecutive operators
    if (prevElementIsOperator && value !== "=") {
      newArray.pop(); // Remove last operator
      newArray.push(value); // Add current operator
      setComputationDisplay(value);
      setComputationArray([...newArray]);
      setprevElementIsOperator(true);
      return;
    }

    // Handle "=" operator
    if (value === "=") {
      const expression = newArray.join("");

      try {
        const result = eval(expression); 
        setComputationDisplay(result.toString());
        setComputationArray([...newArray, value]);
        setJustEvaluated(true);
        setprevElementIsOperator(false);
      } catch (error) {
        setComputationDisplay("Error");
      }

      return;
    }

    // Add operator to the computation array
    setComputationArray([...newArray, value]);
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
