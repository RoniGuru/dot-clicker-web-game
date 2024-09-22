import { useNavigate } from 'react-router-dom';
import { logInUser } from '../../state/userSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { AppDispatch } from '../../state/store';

export const LoginPopup = ({
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

      localStorage.clear();

      if (result.payload) {
        const { accessToken, refreshToken } = result.payload as {
          accessToken: string;
          refreshToken: string;
        };

        localStorage.setItem('token', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        if (logInUser.rejected.match(result)) {
          alert(`Login failed: ${result.payload || 'Unknown error'}`);
        }
        navigate('/user');
        onClose();
      }
    } catch (error: any) {
      console.error('Error logging in:', error);
      alert('Login details not valid');
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center "
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg flex flex-col gap-2 justify-center w-80"
        onClick={(e) => e.stopPropagation()}
      >
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
