import { RootState } from '../state/store';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startGame, endGame } from '../state/gameSlice';

function Home() {
  const game = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();
  const [seconds, setSeconds] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);

  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    if (seconds < game.timer && game.start) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);

      // Cleanup the interval on component unmount
      return () => clearInterval(interval);
    }
    if (seconds >= game.timer) {
      dispatch(endGame(score));
      setActive(false);
      setScore(0);
      setSeconds(0);
    }
  }, [seconds, game.start]);

  function setDot() {
    setActive(false);
    randomPosition();
    setScore(score + 1);
    setTimeout(() => {
      setActive(true);
    }, 200);
  }

  function randomPosition() {
    setX(Math.floor(Math.random() * 80) + 10);

    setY(Math.floor(Math.random() * 80) + 10);
  }

  return (
    <div className="flex justify-center flex-col items-center h-full ">
      <div className="mt-4 flex   mb-4 text-2xl font-bold justify-around items-center w-1/3 ">
        <div className="w-48">High Score : {game.highScore}</div>

        <div className="h-24 w-24 rounded-full border-black border-8  flex justify-center items-center text-2xl font-bold  ">
          {seconds}
        </div>
        <div className="w-48"> Score :{score}</div>
      </div>
      <div className="w-2/3 bg-blue-500 box">
        <div
          className={`${
            active ? 'bg-red-300 h-16 w-16 cursor-pointer' : 'invisible'
          } rounded-full relative transition-all duration-100 ease-out`}
          style={{ left: `${x}%`, top: `${y}%` }}
          onClick={() => setDot()}
        ></div>
      </div>
      <div className="flex flex-col gap-2 justify-center">
        <div className="flex justify-center flex-col"></div>
        <div className="flex gap-4 ">
          <button
            onClick={() => {
              dispatch(startGame());
              setScore(0);
              randomPosition();
              setActive(true);
            }}
            className={`${
              game.start ? 'bg-green-400' : 'bg-blue-400'
            } px-10 py-6 rounded hover:opacity-50`}
          >
            start
          </button>
          <button
            onClick={() => {
              dispatch(endGame(score));
              setActive(false);
              setSeconds(0);
            }}
            className={`${
              game.start ? 'bg-red-400' : 'bg-blue-400'
            } px-10 py-6 rounded hover:opacity-50`}
          >
            end
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
