import { RootState } from '../state/store';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startGame, endGame, setHighScore } from '../state/gameSlice';
import { AppDispatch } from '../state/store';
import { updateUserScore } from '../state/userSlice';
import Game from '../components/Game';
import { useNavigate } from 'react-router-dom';

function UserHome() {
  const navigate = useNavigate();

  const game = useSelector((state: RootState) => state.game);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [seconds, setSeconds] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    if (user.id) {
      setScore(user.score);
    } else {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (seconds > 0 && game.start) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
    if (seconds == 0) {
      dispatch(endGame());
      if (score > user.score) {
        dispatch(setHighScore(score));
        dispatch(updateUserScore({ user, score }));
      }

      setScore(0);
      setSeconds(game.timer);
    }
  }, [seconds, game.start]);

  return (
    <div className="flex flex-col items-center justify-between h-full  overflow-y-auto">
      <div className="flex flex-col items-center w-full p-4 justify-center ">
        <h1
          className={`text-8xl font-bold text-center ${
            game.start && 'hidden'
          } mb-16`}
        >
          Dot Clicker
        </h1>
        <div
          className={`text-1xl font-bold text-center ${game.start && 'hidden'}`}
        >
          Current High Score : {user.score}
        </div>
        {game.start && (
          <div className="mt-1 flex text-2xl font-bold justify-around items-center w-2/3">
            <div className={`${game.start ? 'w-48' : 'w-96 text-center'}`}>
              High Score: {user.score}
            </div>
            <div className="h-24 w-24 rounded-full border-black border-8 flex justify-center items-center text-2xl font-bold">
              {seconds}
            </div>
            <div className="w-48">Score: {score}</div>
          </div>
        )}
      </div>
      {game.start ? <Game score={score} setScore={setScore} /> : null}

      <div className="flex justify-center items-center flex-grow">
        {!game.start ? (
          <button
            onClick={() => {
              dispatch(startGame());
              setScore(0);
            }}
            className="px-10 py-6 rounded button text-2xl font-bold border-2 border-black transition-all duration-100 ease-out"
          >
            Start
          </button>
        ) : (
          <button
            onClick={() => {
              dispatch(endGame());
              setSeconds(0);
            }}
            className="px-10 py-6 rounded button text-2xl font-bold border-2 border-black transition-all duration-100 ease-out mt-2"
          >
            End
          </button>
        )}
      </div>
    </div>
  );
}

export default UserHome;
