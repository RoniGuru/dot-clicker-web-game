import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../state/store';
import { deleteUser } from '@/state/userSlice';

export function DeleteUserPopup({
  onClose,
  name,
}: {
  onClose: () => void;
  name: string;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const [password, setPassword] = useState<string>('');

  async function handleDelete() {
    const userResponse = window.confirm('Do you want to delete your account?');
    if (userResponse) {
      // User clicked "Yes" (OK)
      console.log('User selected: Yes');

      const result = await dispatch(deleteUser({ name, password }));
      console.log('delete result', result);
      if (result.payload) {
        setPassword('');
      } else {
        alert('failed to delete user check password');
      }
    } else {
      // User clicked "No" (Cancel)
      console.log('User selected: No');
      return;
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

        <button
          className="mt-4 px-4 py-1 rounded button font-bold border-2 border-black transition-all duration-100 ease-out "
          onClick={handleDelete}
        >
          Delete User
        </button>
      </div>
    </div>
  );
}
