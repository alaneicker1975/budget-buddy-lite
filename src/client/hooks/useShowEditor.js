import { useAppContext } from '../AppProvider';
import { SET_SHOW_EDITOR } from '../reducers/appReducer';

const useShowEditor = () => {
  const { dispatch } = useAppContext();

  const setShowEditor = (payload) => {
    dispatch({ type: SET_SHOW_EDITOR, payload });
  };

  return { setShowEditor };
};

export default useShowEditor;
