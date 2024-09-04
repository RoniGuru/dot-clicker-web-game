import { useState } from 'react';
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../state/store';

interface loginData {
  accessToken: string;
  refreshToken: string;
  user: { id: number; name: string; score: number };
}

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [login, setLogin] = useState<boolean>(true);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <>
      <nav className="flex w-full items-center justify-between p-4 text-l font-semibold bg-blue-300">
        <button
          onClick={() => setIsPopupOpen(true)}
          className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
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
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function handleLogin() {
    try {
      const result = await api.post('/user/login', {
        name: username,
        password: password,
      });

      const data: loginData = result.data;

      localStorage.setItem(ACCESS_TOKEN, data.accessToken);
      localStorage.setItem(REFRESH_TOKEN, data.refreshToken);

      navigate('/user');

      console.log(data);
    } catch (error) {
      console.log('Error logging in:', error);
      alert('login details not valid');
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
      <div className="bg-white p-6 rounded-lg flex flex-col gap-2 justify-center w-80">
        <button
          onClick={onClose}
          className="mt-4 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 justify-self-end  ml-auto"
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
          className="mt-4 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 "
          onClick={handleLogin}
        >
          login
        </button>
        <button
          className="mt-4 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 "
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
          className="mt-4 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 justify-self-end  ml-auto "
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
        <label htmlFor="confirmPassword">confirm password</label>
        <input
          type="password"
          className="border-black border-2"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          className="mt-4 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 "
          onClick={handleRegister}
        >
          Register
        </button>
        <button
          className="mt-4 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 "
          onClick={() => setLogin(true)}
        >
          Already have a account Log In
        </button>
      </div>
    </div>
  );
};

export default Navbar;
