import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [quotesData, setQuotesData] = useState([]);
  const [randomQuote, setRandomQuote] = useState(null);
  const [randomPhoto, setRandomPhoto] = useState("");
  const [photoArray, setPhotoArray] = useState([]);
  const [count, setCount] = useState(0);
  const maxCount = 3; // Limit the number of fetches

  useEffect(() => {
    fetch("https://dummyjson.com/quotes")
      .then(res => res.json())
      .then(data => {
        setQuotesData(data.quotes);
        if (data.quotes.length > 0) {
          setRandomQuote(data.quotes[Math.floor(Math.random() * data.quotes.length)]);
        }
      })
      .catch(error => console.error("Error:", error));

    fetch("http://localhost:5000/api/photo")
      .then(res => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then(data => {
        // console.log("Data received from server.js: ", data);
        // console.log("Data type of data received from server.js: ", typeof data);
        const urls = data.map(item => item.urls.full);
        setPhotoArray(urls); 
        // console.log("PhotoArray: ", photoArray);

        if (urls.length > 0){
          setRandomPhoto(urls[Math.floor(Math.random() * urls.length)]);
        } else {
          setRandomPhoto("https://static.vecteezy.com/system/resources/thumbnails/040/890/255/small_2x/ai-generated-empty-wooden-table-on-the-natural-background-for-product-display-free-photo.jpg");
        }
        
        setCount(1);
      })
      .catch(error => console.error("Error:", error));
      setRandomPhoto("https://static.vecteezy.com/system/resources/thumbnails/040/890/255/small_2x/ai-generated-empty-wooden-table-on-the-natural-background-for-product-display-free-photo.jpg");
  }, []); // Only run once on component mount
  
  const getRandomIndex = () => {
    if (quotesData.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotesData.length);
      setRandomQuote(quotesData[randomIndex]);
    }

    if (count < maxCount) {
      fetch("http://localhost:5000/api/photo")
        .then(res => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then(data => {
          setPhotoArray(prevArray => [...prevArray, ...data.map(item => item.urls.full)]);
          // console.log("PhotoArray: ", photoArray);
          setRandomPhoto(data[Math.floor(Math.random() * data.length)].urls.full);
          setCount(count + 1);
        })
        .catch(error => console.error("Error:", error));
    } else {
      setRandomPhoto(photoArray[Math.floor(Math.random() * photoArray.length)]);
    }
  };

  return (
    <div
      className="body flex"
      style={{
        backgroundImage: `url(${randomPhoto})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      <div className="quote-box flex" id="quote-box">
        <div className="quote-border flex" id="text">
          {randomQuote ? <p>{randomQuote.quote}</p> : ""}
        </div>
        
        <div className="authorContainer" id="author">
          {randomQuote ? <p className="author">{randomQuote.author}</p> : ""}
        </div>

        <div className="buttons flex">

          <a className="fa-brands fa-square-twitter fa-lg" href="twitter.com/intent/tweet" target="_blank" id="tweet-quote">
          </a>
   
          <button className="fa-solid fa-square-caret-right fa-lg" id="new-quote" onClick={getRandomIndex}>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
