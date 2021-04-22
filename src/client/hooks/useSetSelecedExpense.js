import { useAppContext } from '../AppProvider';
import { SET_SELECTED_EXPENSE } from '../reducers/appStateReducer';

const useSetSelecedExpense = () => {
  const { dispatch } = useAppContext();

  const setExpense = (payload) => {
    dispatch({ type: SET_SELECTED_EXPENSE, payload });
  };

  return { setExpense };
};

export default useSetSelecedExpense;
