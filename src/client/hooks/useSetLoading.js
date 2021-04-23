import { useAppContext } from '../AppProvider';
import { SET_IS_LOADING } from '../reducers/appReducer';

const useSetLoading = () => {
  const { dispatch } = useAppContext();

  const setLoading = (payload) => {
    dispatch({ type: SET_IS_LOADING, payload });
  };

  return { setLoading };
};

export default useSetLoading;
