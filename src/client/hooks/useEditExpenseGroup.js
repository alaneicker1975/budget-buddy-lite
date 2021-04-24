import useSetGlobalMessage from './useSetGlobalMessage';
import useSetSelecedExpense from './useSetSelecedExpense';
import useSetUpdateExpenseGroup from './useSetUpdateExpenseGroup';
import useShowEditor from './useShowEditor';
import useSetLoading from './useSetLoading';

const useEditExpenseGroup = () => {
  const { setMessage } = useSetGlobalMessage();
  const { setExpense } = useSetSelecedExpense();
  const { updateExpenseGroup } = useSetUpdateExpenseGroup();
  const { setShowEditor } = useShowEditor();
  const { setLoading } = useSetLoading();

  const setSelectedExpense = async (id) => {
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_BASE_URL}/expenseGroups/${id}`,
      );

      const { err, data } = await response.json();

      if (err) {
        setMessage('error', err);
        setLoading(false);
        return;
      }

      delete data.__v;

      setExpense(data);
      setShowEditor(true);
    } catch (err) {
      setMessage('error', err.message);
    }

    setLoading(false);
  };

  const saveChanges = async (json) => {
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

  return { setSelectedExpense, saveChanges };
};

export default useEditExpenseGroup;
