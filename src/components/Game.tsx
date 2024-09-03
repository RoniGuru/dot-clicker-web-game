import { useState } from 'react';

interface gameProps {
  score: number;
  setScore: (score: number) => void;
}

const Game = ({ score, setScore }: gameProps) => {
  const [active, setActive] = useState<boolean>(false);

  const [x, setX] = useState<number>(Math.floor(Math.random() * 80) + 15);
  const [y, setY] = useState<number>(Math.floor(Math.random() * 80) + 15);

  function setDot() {
    setActive(false);
    randomPosition();
    setScore(score + 1);
    setTimeout(() => {
      setActive(true);
    }, 100);
  }

  function randomPosition() {
    setX(Math.floor(Math.random() * 80) + 15);
    setY(Math.floor(Math.random() * 80) + 15);
  }

  return (
    <div
      className={`border-black border-4
       w-2/3  box rounded-lg  transition-all duration-100 ease-out `}
    >
      <div
        className={`bg-black h-16 w-16 cursor-pointer rounded-full relative transition-all duration-100 ease-out`}
        style={{ left: `${x}%`, top: `${y}%` }}
        onClick={() => setDot()}
      ></div>
    </div>
  );
};

export default Game;
