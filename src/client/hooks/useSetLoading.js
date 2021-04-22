import { useAppContext } from '../AppProvider';
import { SET_IS_LOADING } from '../reducers/appStateReducer';

const useSetLoading = () => {
  const { dispatch } = useAppContext();

  const setLoading = (loading) => {
    dispatch({ type: SET_IS_LOADING, payload: loading });
  };

  return { setLoading };
};

export default useSetLoading;
