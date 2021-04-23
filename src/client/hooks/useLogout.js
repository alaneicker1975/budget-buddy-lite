import { useAppContext } from '../AppProvider';
import useSetIsLoggedIn from '../hooks/useSetIsLoggedIn';

const useLogout = () => {
  const {
    state: { history },
  } = useAppContext();
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
      history.push('/');
    }
  };

  return { logoutUser };
};

export default useLogout;
