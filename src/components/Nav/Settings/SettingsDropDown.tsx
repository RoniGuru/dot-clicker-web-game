import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { user } from '@/state/userSlice';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../../state/store';
import { logOutUser } from '../../../state/userSlice';
import { DeleteUserPopup } from './DeleteUserPopup';
import { useState } from 'react';

function SettingDropDown({ user }: { user: user }) {
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  async function handleLogOut() {
    dispatch(logOutUser(user.id!));
    localStorage.clear();
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>Setting</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Update User</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDeletePopupOpen(true)}>
            Delete User
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogOut}>Log Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isDeletePopupOpen ? (
        <DeleteUserPopup
          onClose={() => setIsDeletePopupOpen(false)}
          name={user.name}
        />
      ) : null}
    </div>
  );
}

export default SettingDropDown;
