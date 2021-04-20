import { useState } from 'react';

const useLogout = () => {
  const [loggedOut, setLoggedOut] = useState(false);

  const logoutUser = async () => {
    const response = await fetch(`${process.env.API_BASE_URL}/user/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const { isLoggedOut } = await response.json();

    if (isLoggedOut) {
      setLoggedOut(true);
    }
  };

  return { logoutUser, loggedOut };
};

export default useLogout;
