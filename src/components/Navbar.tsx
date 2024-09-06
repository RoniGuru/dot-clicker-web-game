import { useState } from 'react';
import { api } from '../api';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../state/store';
import { AppDispatch } from '../state/store';
import { logInUser, logOutUser } from '../state/userSlice';

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
  async function handleLogOut() {
    dispatch(logOutUser(user.id!));
  }
  return (
    <>
      <nav className="flex w-full items-center justify-between p-4 text-l font-semibold ">
        <div>{user.id ? `Welcome ${user.name}` : ''}</div>
        {user.id ? (
          <button onClick={handleLogOut}>Log Out</button>
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

const LoginPopup = ({
  onClose,
  setLogin,
}: {
  onClose: () => void;
  setLogin: (value: boolean) => void;
}) => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function handleLogin() {
    try {
      const result = await dispatch(logInUser({ username, password }));
      console.log(result);
      if (logInUser.rejected.match(result)) {
        alert(`Login failed: ${result.payload || 'Unknown error'}`);
      }
      navigate('/user');
      onClose();
    } catch (error: any) {
      console.error('Error logging in:', error);
      alert('Login details not valid');
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
      <div className="bg-white p-6 rounded-lg flex flex-col gap-2 justify-center w-80">
        <button
          onClick={onClose}
          className="mt-1 px-4 py-1  justify-self-end  ml-auto rounded button font-bold border-2 border-black transition-all duration-100 ease-out"
        >
          Close
        </button>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username" // Add this id attribute
          className="border-black border-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password" // Add this id attribute
          className="border-black border-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="mt-4 px-4 py-1 rounded button font-bold border-2 border-black transition-all duration-100 ease-out "
          onClick={handleLogin}
        >
          login
        </button>
        <button
          className="mt-4 px-4 py-1 rounded button font-bold border-2 border-black transition-all duration-100 ease-out "
          onClick={() => setLogin(true)}
        >
          No Account Register
        </button>
      </div>
    </div>
  );
};

const RegisterPopup = ({
  onClose,
  setLogin,
}: {
  onClose: () => void;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  async function handleRegister() {
    if (password != confirmPassword) {
      return alert("passwords don't match");
    }

    try {
      const result = await api.post('/user/register', {
        name: username,
        password: password,
      });

      console.log(result);
    } catch (error) {
      console.log('Error registering :', error);
      return alert('Error registering user name is not unique');
    }

    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setLogin(true);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg flex flex-col gap-2 justify-center w-80">
        <button
          onClick={onClose}
          className="mt-1 px-4 py-1 rounded button font-bold border-2 border-black transition-all duration-100 ease-out   ml-auto "
        >
          Close
        </button>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username" // Add this id attribute
          className="border-black border-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password" // Add this id attribute
          className="border-black border-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          type="password"
          className="border-black border-2"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          className="mt-4 px-4 py-1 rounded button font-bold border-2 border-black transition-all duration-100 ease-out "
          onClick={handleRegister}
        >
          Register
        </button>
        <button
          className="mt-4 px-4 py-1 rounded button font-bold border-2 border-black transition-all duration-100 ease-out "
          onClick={() => setLogin(true)}
        >
          Already have a account Log In
        </button>
      </div>
    </div>
  );
};

export default Navbar;
