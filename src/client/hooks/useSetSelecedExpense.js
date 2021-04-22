import { useAppContext } from '../AppProvider';
import { SET_SELECTED_EXPENSE } from '../reducers/appReducer';

const useSetSelecedExpense = () => {
  const { dispatch } = useAppContext();

  const setExpense = (payload) => {
    dispatch({ type: SET_SELECTED_EXPENSE, payload });
  };

  return { setExpense };
};

export default useSetSelecedExpense;
