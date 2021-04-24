import useSetGlobalMessage from './useSetGlobalMessage';
import useSetSelecedExpense from './useSetSelecedExpense';
import useUpdateExpenseGroup from './useUpdateExpenseGroup';
import useShowEditor from './useShowEditor';

const useEditExpenseGroup = () => {
  const { setMessage } = useSetGlobalMessage();
  const { setExpense } = useSetSelecedExpense();
  const { updateExpenseGroup } = useUpdateExpenseGroup();
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

    const { expenseGroup } = await response.json();

    if (expenseGroup) {
      updateExpenseGroup(expenseGroup, _id);
    } else {
      setMessage('error', `Could not ${_id ? 'update' : 'create'} expense`);
    }

    setShowEditor(false);
  };

  return { setSelectedExpense, onSubmit };
};

export default useEditExpenseGroup;
