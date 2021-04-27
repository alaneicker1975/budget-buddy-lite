import useSetGlobalMessage from './useSetGlobalMessage';
import useSetSelecedExpense from './useSetSelecedExpense';
import useSetUpdateExpenseGroup from './useSetUpdateExpenseGroup';
import useShowEditor from './useShowEditor';
import useSetLoading from './useSetLoading';
import request from '../utilities/request';

const useEditExpenseGroup = () => {
  const { setMessage } = useSetGlobalMessage();
  const { setExpense } = useSetSelecedExpense();
  const { updateExpenseGroup } = useSetUpdateExpenseGroup();
  const { setShowEditor } = useShowEditor();
  const { setLoading } = useSetLoading();

  const setSelectedExpense = async (id) => {
    setLoading(true);

    const { err, data } = await request({ url: `/expenseGroups/${id}` });

    if (err) {
      setMessage('error', err);
      setLoading(false);
    } else {
      setExpense(data);
      setShowEditor(true);
    }

    setLoading(false);
  };

  const saveChanges = async (json) => {
    const { _id } = json;

    const { expenseGroup, err } = await request({
      url: `/expenseGroups/${_id || ''}`,
      method: _id ? 'PATCH' : 'POST',
      body: json,
    });

    if (err) {
      setMessage('error', err);
    }

    updateExpenseGroup(expenseGroup, _id);
    setShowEditor(false);
  };

  return { setSelectedExpense, saveChanges };
};

export default useEditExpenseGroup;
