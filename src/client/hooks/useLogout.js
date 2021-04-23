import useSetIsLoggedIn from '../hooks/useSetIsLoggedIn';

const useLogout = () => {
  const { setLoggedIn } = useSetIsLoggedIn();

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
      setLoggedIn(false);
    }
  };

  return { logoutUser };
};

export default useLogout;
