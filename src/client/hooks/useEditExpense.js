import useSetGlobalMessage from './useSetGlobalMessage';
import useSetSelecedExpense from './useSetSelecedExpense';
import useUpdateExpenseGroups from './useUpdateExpenseGroups';
import useShowEditor from './useShowEditor';
import useSetData from './useSetData';

const useEditExpense = () => {
  const { setMessage } = useSetGlobalMessage();
  const { setExpense } = useSetSelecedExpense();
  const { updateExpenseGroup } = useUpdateExpenseGroups();
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

  const onSubmit = async (json) => {
    const { _id } = json;

    const response = await fetch(
      `${process.env.API_BASE_URL}/expenseGroups/${_id || ''}`,
      {
        method: _id ? 'PATCH' : 'POST',
        body: JSON.stringify(json),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    if (_id) {
      updateExpenseGroup(json, _id);
    } else {
      const { expenseGroup } = await response.json();

      if (expenseGroup) {
        updateExpenseGroup(expenseGroup);
      } else {
        setMessage('error', 'Could not add new user');
      }
    }

    setShowEditor(false);
  };

  return { setSelectedExpense, onSubmit };
};

export default useEditExpense;
