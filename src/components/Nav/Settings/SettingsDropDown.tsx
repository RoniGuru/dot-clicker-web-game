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

function SettingDropDown({ user }: { user: user }) {
  const dispatch = useDispatch<AppDispatch>();
  async function handleLogOut() {
    dispatch(logOutUser(user.id!));
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Setting</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Update User</DropdownMenuItem>
        <DropdownMenuItem>Delete User</DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogOut}>Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SettingDropDown;
