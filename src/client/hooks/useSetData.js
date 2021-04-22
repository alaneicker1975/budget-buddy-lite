import { useAppContext } from '../AppProvider';
import { SET_DATA } from '../reducers/appReducer';

const useSetData = () => {
  const { dispatch } = useAppContext();

  const setData = (payload, _id) => {
    dispatch({
      type: SET_DATA,
      payload,
    });
  };

  return { setData };
};

export default useSetData;
