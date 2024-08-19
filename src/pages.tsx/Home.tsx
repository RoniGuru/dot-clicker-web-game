import { RootState } from '../state/store';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startGame, endGame, setDot, resetDot } from '../state/gameSlice';

function Home() {
  const game = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();
  const [seconds, setSeconds] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    if (seconds < game.timer && game.start) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);

      // Cleanup the interval on component unmount
      return () => clearInterval(interval);
    }
    if (seconds >= 10) {
      dispatch(endGame(score));
      setScore(0);
    }
  }, [seconds, game.start]);

  function checkClick(index: number) {
    if (game.dots[index] === true) {
      setScore(score + 1);
      dispatch(resetDot(index));
      setTimeout(() => {
        dispatch(setDot());
      }, 200);
    } else {
      setScore(score - 1);
    }
  }

  return (
    <div className="flex justify-center flex-col items-center h-full">
      <div className=" grid grid-cols-2 bg-red-500 w-2/3 m-auto place-items-center    ">
        {game.dots.map((item, index) => (
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
              onClick={() => (game.start ? checkClick(index) : null)}
            >{`${item}`}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 justify-center">
        <div>high score : {game.highScore}</div>
        <div>score :{score}</div>
        <div>seconds :{seconds} </div>
        <button
          onClick={() => dispatch(startGame())}
          className="bg-red-400 px-7 py-3 rounded hover:opacity-50"
        >
          start
        </button>
        <button
          onClick={() => dispatch(endGame(score))}
          className="bg-red-400 px-7 py-3 rounded hover:opacity-50"
        >
          end
        </button>
      </div>
    </div>
  );
}

export default Home;
