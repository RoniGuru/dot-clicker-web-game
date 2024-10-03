import { useState } from 'react';
import { RegisterPopup } from './RegisterPopup';
import { LoginPopup } from './LoginPopup';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { DeleteUserPopup } from './DeleteUserPopup';
import { useDispatch } from 'react-redux';
import { UpdateUserPopup } from './UpdateUserPopup';
import { AppDispatch } from '../../state/store';
import { logOutUser } from '../../state/userSlice';
import LeaderBoardPopup from './LeaderBoard';
export interface loginData {
  accessToken: string;
  refreshToken: string;
  user: { id: number; name: string; score: number };
}

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const [login, setLogin] = useState<boolean>(true);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [isLeaderBoardOpen, setIsLeaderBoardOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  async function handleLogOut() {
    dispatch(logOutUser(user.id!));
    localStorage.clear();
  }

  return (
    <>
      <nav className="flex w-full items-center justify-between p-4 text-l font-semibold ">
        <div>{user.id ? `Welcome ${user.name}` : ''}</div>
        {user.id ? (
          <div className="flex gap-10 mr-4">
            <div
              onClick={() => setIsLeaderBoardOpen(true)}
              className="px-4 py-1   rounded button font-bold border-2 border-black transition-all duration-100 ease-out"
            >
              LeaderBoard
            </div>
            <div
              onClick={() => setIsUpdatePopupOpen(true)}
              className="px-4 py-1   rounded button font-bold border-2 border-black transition-all duration-100 ease-out"
            >
              Update User
            </div>
            <div
              onClick={() => setIsDeletePopupOpen(true)}
              className="px-4 py-1   rounded button font-bold border-2 border-black transition-all duration-100 ease-out"
            >
              Delete User
            </div>
            <div
              onClick={handleLogOut}
              className="px-4 py-1   rounded button font-bold border-2 border-black transition-all duration-100 ease-out"
            >
              Log out
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsPopupOpen(true)}
            className="px-4 py-1   rounded button font-bold border-2 border-black transition-all duration-100 ease-out"
          >
            Login
          </button>
        )}
      </nav>
      {isPopupOpen &&
        (login ? (
          <LoginPopup
            onClose={() => setIsPopupOpen(false)}
            setLogin={() => setLogin(false)}
          />
        ) : (
          <RegisterPopup
            onClose={() => setIsPopupOpen(false)}
            setLogin={() => setLogin(true)}
          />
        ))}
      {isDeletePopupOpen ? (
        <DeleteUserPopup
          onClose={() => setIsDeletePopupOpen(false)}
          name={user.name}
        />
      ) : null}
      {isUpdatePopupOpen ? (
        <UpdateUserPopup
          onClose={() => setIsUpdatePopupOpen(false)}
          user={user}
        />
      ) : null}
      {isLeaderBoardOpen ? (
        <LeaderBoardPopup onClose={() => setIsLeaderBoardOpen(false)} />
      ) : null}
    </>
  );
};

export default Navbar;
