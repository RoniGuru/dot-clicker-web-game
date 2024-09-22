import { useState } from 'react';
import * as userAPI from '../../api/user';
import { detailsChecker } from '../../util/detailsChecker';

export const RegisterPopup = ({
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
    const check = detailsChecker(username, password);

    if (!check) return;

    try {
      const result = await userAPI.registerUser(username, password);

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
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg flex flex-col gap-2 justify-center w-80"
        onClick={(e) => e.stopPropagation()}
      >
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
