import { useAppContext } from '../AppProvider';
import { SET_DATA } from '../reducers/appStateReducer';

const useSetData = () => {
  const { dispatch } = useAppContext();

  const setData = (data) => {
    dispatch({
      type: SET_DATA,
      payload: data,
    });
  };

  return { setData };
};

export default useSetData;
