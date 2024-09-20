import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../state/store';
import { RootState } from '../../state/store';
import { getLeaderBoard } from '../../state/leaderBoardSlice';
import { useEffect } from 'react';

function LeaderBoardPopup({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    dispatch(getLeaderBoard());
  }, []);
  const dispatch = useDispatch<AppDispatch>();
  const rankings = useSelector((state: RootState) => state.leaderBoard);
  async function refreshLeaderBoard() {
    await dispatch(getLeaderBoard());
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg flex flex-col gap-2 justify-center w-80 "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="mt-1 px-4 py-1 rounded button font-bold border-2 border-black transition-all duration-100 ease-out   ml-auto "
        >
          Close
        </button>
        <div className="flex flex-col gap-2 mt-3 mb-3">
          {rankings
            ? rankings.ranks.map((rank) => (
                <div
                  key={rank.username}
                  className="flex justify-between border-black border-b-2 px-2 pb-1  font-bold "
                >
                  <div>{rank.username}</div>
                  <div>{rank.high_score}</div>
                </div>
              ))
            : null}
        </div>
        <button
          className="mt-4 px-4 py-1 rounded button font-bold border-2 border-black transition-all duration-100 ease-out "
          onClick={refreshLeaderBoard}
        >
          Update LeaderBoard
        </button>
      </div>
    </div>
  );
}

export default LeaderBoardPopup;
