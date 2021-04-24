import { useAppContext } from '../AppProvider';
import { SET_GLOBAL_MESSAGE } from '../reducers/appReducer';

const useSetGlobalMessage = () => {
  const { dispatch } = useAppContext();

  const setMessage = (theme, text) => {
    dispatch({
      type: SET_GLOBAL_MESSAGE,
      payload:
        !theme && !text
          ? null
          : {
              theme,
              text,
            },
    });
  };

  return { setMessage };
};

export default useSetGlobalMessage;
