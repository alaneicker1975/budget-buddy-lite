import { useAppContext } from '../AppProvider';
import { SET_HISTORY } from '../reducers/appStateReducer';

const useSetHistory = () => {
  const { dispatch } = useAppContext();

  const setHistory = (payload) => {
    dispatch({
      type: SET_HISTORY,
      payload,
    });
  };

  return { setHistory };
};

export default useSetHistory;
