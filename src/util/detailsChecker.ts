export function detailsChecker(username: string, password: string) {
  if (checkUsername(username) && checkPassword(password)) {
    return true;
  } else {
    return false;
  }
}

export function checkUsername(username: string) {
  if (username.length <= 5) {
    alert('username needs to be longer than 5 characters');
    return false;
  }

  const hasLetters = /[a-zA-Z]/.test(username);
  if (hasLetters) {
    return true;
  } else {
    alert('username needs to contain letters');
    return false;
  }
}

export function checkPassword(password: string) {
  if (password.length <= 5) {
    alert('password needs to be longer than 5 characters');
    return false;
  } else {
    return true;
  }
}
