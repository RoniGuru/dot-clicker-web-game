import { useState, useEffect } from 'react';

const dotsArray = [false, false, false, false];

function App() {
  const [dots, setDots] = useState<boolean[]>(dotsArray);
  const [game, setGame] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);

  const [seconds, setSeconds] = useState(0);

  const [targets, setTargerts] = useState(0);

  useEffect(() => {
    if (seconds < 10 && game) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);

      // Cleanup the interval on component unmount
      return () => clearInterval(interval);
    }
    if (seconds >= 10) {
      endGame();
    }
  }, [seconds, game]);

  function randomGreen(num: number) {
    const randomNum = Math.floor(Math.random() * num);
    setValues(randomNum);
  }

  function checkClick(index: number) {
    if (dots[index] === true) {
      setScore(score + 1);
      resetDots();
      setTimeout(() => {
        randomGreen(4);
      }, 100);
    } else {
      setScore(score - 1);
    }
  }

  function startGame() {
    setGame(true);
    randomGreen(4);
  }

  function endGame() {
    setGame(false);
    setSeconds(0);
    if (score > highScore) {
      setHighScore(score);
    }
    setScore(0);

    setTimeout(() => {
      resetDots();
    }, 150);
  }

  function resetDots() {
    const updatedArray = Array(dots.length).fill(false);

    setDots(updatedArray);
  }

  function setValues(index: number) {
    const updatedArray = Array(dots.length).fill(false); // Turn off all dots
    updatedArray[index] = true; // Turn on the dot at the specified index
    setDots(updatedArray);
  }
  return (
    <div className="flex justify-center flex-col items-center h-full">
      <div className=" grid grid-cols-2 bg-red-500 w-2/3 m-auto place-items-center    ">
        {dots.map((item, index) => (
          <div
            key={index}
            className="h-96 bg-slate-400 w-64 flex justify-center"
          >
            <div
              className={
                item
                  ? 'bg-green-300  h-48 rounded-full w-48 cursor-pointer'
                  : 'bg-red-300 h-48 rounded-full w-48 cursor-pointer'
              }
              onClick={() => (game ? checkClick(index) : null)}
            >{`${item}`}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 justify-center">
        <div>high score : {highScore}</div>
        <div>score :{score}</div>
        <div>seconds :{seconds} </div>
        <button
          onClick={() => startGame()}
          className="bg-red-400 px-7 py-3 rounded hover:opacity-50"
        >
          start
        </button>
        <button
          onClick={() => endGame()}
          className="bg-red-400 px-7 py-3 rounded hover:opacity-50"
        >
          end
        </button>
      </div>
    </div>
  );
}

export default App;
