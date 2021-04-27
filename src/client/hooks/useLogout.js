import { useAppContext } from '../AppProvider';
import useSetIsLoggedIn from '../hooks/useSetIsLoggedIn';
import request from '../utilities/request';

const useLogout = () => {
  const {
    state: { history },
  } = useAppContext();
  const { setLoggedIn } = useSetIsLoggedIn();

  const logoutUser = async () => {
    const { isLoggedOut } = await request({
      url: '/user/logout',
      method: 'POST',
    });

    if (isLoggedOut) {
      setLoggedIn(false);
      history.push('/');
    }
  };

  return { logoutUser };
};

export default useLogout;
