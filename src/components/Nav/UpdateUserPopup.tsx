import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../state/store';
import { updateUserName, updateUserPassword } from '../../state/userSlice';
import { user } from '../../state/userSlice';

export function UpdateUserPopup({
  onClose,
  user,
}: {
  onClose: () => void;
  user: user;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newName, setNewName] = useState<string>('');

  const [update, setUpdate] = useState<string>('username');

  async function handleUpdate() {
    if (update === 'password') {
      const id = user.id as number;
      const name = user.name;
      await dispatch(updateUserPassword({ id, name, newPassword, password }));
    } else {
      const id = user.id as number;
      const name = user.name;
      await dispatch(updateUserName({ id, name, newName: newName, password }));
    }
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

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password" // Add this id attribute
          className="border-black border-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {update === 'password' ? (
          <>
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword" // Add this id attribute
              className="border-black border-2"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </>
        ) : (
          <>
            <label htmlFor="newUsername">New Username</label>
            <input
              id="newUsername" // Add this id attribute
              className="border-black border-2"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </>
        )}

        <button
          className="mt-4 px-4 py-1 rounded button font-bold border-2 border-black transition-all duration-100 ease-out "
          onClick={handleUpdate}
        >
          update
        </button>

        <button
          className="mt-4 px-4 py-1 rounded button font-bold border-2 border-black transition-all duration-100 ease-out "
          onClick={() =>
            update === 'password'
              ? setUpdate('username')
              : setUpdate('password')
          }
        >
          {update === 'password'
            ? ' update username instead'
            : 'update password instead'}
        </button>
      </div>
    </div>
  );
}
