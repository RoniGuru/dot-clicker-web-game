import { useState } from 'react';
import { RegisterPopup } from './RegisterPopup';
import { LoginPopup } from './LoginPopup';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state/store';
import { AppDispatch } from '../../state/store';
import { logOutUser } from '../../state/userSlice';
import SettingDropDown from './Settings/SettingsDropDown';

export interface loginData {
  accessToken: string;
  refreshToken: string;
  user: { id: number; name: string; score: number };
}

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user);

  const [login, setLogin] = useState<boolean>(true);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <nav className="flex w-full items-center justify-between p-4 text-l font-semibold ">
        <div>{user.id ? `Welcome ${user.name}` : ''}</div>
        {user.id ? (
          <SettingDropDown user={user} />
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
    </>
  );
};

export default Navbar;
