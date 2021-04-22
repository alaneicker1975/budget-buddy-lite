import useSetGlobalMessage from './useSetGlobalMessage';
import useShowEditor from './useShowEditor';
import useSetSelecedExpense from './useSetSelecedExpense';

const useEditExpense = () => {
  const { setMessage } = useSetGlobalMessage();
  const { setExpense } = useSetSelecedExpense();
  const { setShowEditor } = useShowEditor();

  const setSelectedExpense = async (id) => {
    try {
      const response = await fetch(
        `${process.env.API_BASE_URL}/expenseGroups/${id}`,
      );

      const { err, data } = await response.json();

      if (err) {
        setMessage('error', err);
        return;
      }

      delete data.__v;

      setShowEditor(true);
      setExpense(data);
    } catch (err) {
      setMessage('error', err.message);
    }
  };

  return { setSelectedExpense };
};

export default useEditExpense;
