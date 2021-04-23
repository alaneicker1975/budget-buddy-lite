import { useAppContext } from '../AppProvider';
import { SET_IS_LOGGED_IN } from '../reducers/appReducer';

const useSetIsLoggedIn = () => {
  const { dispatch } = useAppContext();

  const setLoggedIn = (payload) => {
    dispatch({ type: SET_IS_LOGGED_IN, payload });
  };

  return { setLoggedIn };
};

export default useSetIsLoggedIn;
