import { RootState } from '../state/store';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startGame, endGame, setHighScore } from '../state/gameSlice';

function Home() {
  const game = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();
  const [seconds, setSeconds] = useState<number>(0);
  const [score, setScore] = useState<number>(game.timer);

  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);

  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    getHighScoreLocal();
  }, [game.highScore]);

  useEffect(() => {
    if (seconds > 0 && game.start) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      // Cleanup the interval on component unmount
      return () => clearInterval(interval);
    }
    if (seconds == 0) {
      dispatch(endGame());
      if (score > game.highScore) {
        dispatch(setHighScore(score));
      }
      setActive(false);
      setScore(0);
      setSeconds(game.timer);
      localStorage.setItem('highScore', JSON.stringify(game.highScore));
    }
  }, [seconds, game.start]);

  function setDot() {
    setActive(false);
    randomPosition();
    setScore(score + 1);
    setTimeout(() => {
      setActive(true);
    }, 100);
  }

  function getHighScoreLocal() {
    const savedHighScore = Number(localStorage.getItem('highScore'));
    if (savedHighScore) dispatch(setHighScore(savedHighScore));
  }

  function randomPosition() {
    setX(Math.floor(Math.random() * 80) + 10);
    setY(Math.floor(Math.random() * 80) + 10);
  }

  return (
    <div className="flex justify-center flex-col items-center  bg-color h-screen overflow-hidden ">
      <div>
        <h1
          className={`${
            game.start ? '' : 'text-8xl top-48 fixed left-4'
          } text-4xl font-bold w-full text-center`}
        >
          Dot Clicker
        </h1>
        <div
          className={` ${
            game.start
              ? 'mt-4 flex    text-2xl font-bold justify-around items-center w-full'
              : 'hidden'
          }`}
        >
          <div
            className={` ${
              game.start
                ? 'h-24 w-24 rounded-full border-black border-8  flex justify-center items-center text-2xl font-bold'
                : 'hidden'
            }  `}
          >
            {seconds}
          </div>
        </div>
        <div className="flex    text-2xl font-bold gap-48 text-center mb-4">
          <div
            className={`${
              game.start ? 'w-48' : 'centerScore w-96 text-center '
            }`}
          >
            High Score : {game.highScore}
          </div>
          <div className={`${game.start ? 'w-48' : 'hidden'}`}>
            Score : {score}
          </div>
        </div>
      </div>
      <div
        className={`${
          game.start ? 'border-black border-4' : 'hidden'
        } w-2/3  box rounded-lg  transition-all duration-100 ease-out `}
      >
        <div
          className={`${
            active && game.start
              ? 'bg-black h-16 w-16 cursor-pointer'
              : 'invisible'
          } rounded-full relative transition-all duration-100 ease-out`}
          style={{ left: `${x}%`, top: `${y}%` }}
          onClick={() => setDot()}
        ></div>
      </div>
      <div
        className={`${
          game.start
            ? 'flex  gap-16 justify-center  mt-12'
            : 'flex items-center justify-center min-h-screen '
        }`}
      >
        <button
          onClick={() => {
            dispatch(startGame());
            setScore(0);
            randomPosition();
            setActive(true);
          }}
          className={`${
            game.start
              ? 'hidden'
              : 'px-10 py-6 rounded button text-2xl font-bold border-2 border-black transition-all duration-100 ease-out'
          } `}
        >
          Start
        </button>
        <button
          onClick={() => {
            dispatch(endGame());
            setActive(false);
            setSeconds(0);
          }}
          className={`${
            game.start ? '' : 'hidden'
          } px-10 py-6 rounded button text-2xl font-bold border-2 border-black transition-all duration-100 ease-out`}
        >
          End
        </button>
      </div>
    </div>
  );
}

export default Home;
