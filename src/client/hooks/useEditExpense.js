import { useAppContext } from '../AppProvider';
import {
  SET_GLOBAL_MESSAGE,
  SET_SHOW_EDITOR,
  SET_SELECTED_EXPENSE,
} from '../reducers/appStateReducer';

const useEditExpense = () => {
  const { dispatch } = useAppContext();

  const setSelectedExpense = async (id) => {
    try {
      const response = await fetch(
        `${process.env.API_BASE_URL}/expenseGroups/${id}`,
      );

      const { err, data } = await response.json();

      if (err) {
        dispatch({
          type: SET_GLOBAL_MESSAGE,
          payload: {
            theme: 'error',
            text: err,
          },
        });
        return;
      }

      delete data.__v;

      dispatch({ type: SET_SHOW_EDITOR, payload: true });
      dispatch({ type: SET_SELECTED_EXPENSE, payload: data });
    } catch (err) {
      dispatch({
        type: SET_GLOBAL_MESSAGE,
        payload: {
          theme: 'error',
          text: err.message,
        },
      });
    }
  };

  return { setSelectedExpense };
};

export default useEditExpense;
