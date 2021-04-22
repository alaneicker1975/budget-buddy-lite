import { useAppContext } from '../AppProvider';
import { SET_GLOBAL_MESSAGE } from '../reducers/appStateReducer';

const useSetGlobalMessage = () => {
  const { dispatch } = useAppContext();

  const setMessage = (theme, text) => {
    dispatch({
      type: SET_GLOBAL_MESSAGE,
      payload: {
        theme,
        text,
      },
    });
  };

  return { setMessage };
};

export default useSetGlobalMessage;
