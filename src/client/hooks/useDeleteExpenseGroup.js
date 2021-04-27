import { useAppContext } from '../AppProvider';
import useSetData from '../hooks/useSetData';
import useSetGlobalMessage from './useSetGlobalMessage';
import useSetLoading from '../hooks/useSetLoading';
import request from '../utilities/request';

const useDeleteExpenseGroup = () => {
  const {
    state: { data },
  } = useAppContext();
  const { setData } = useSetData();
  const { setMessage } = useSetGlobalMessage();
  const { setLoading } = useSetLoading();

  const deleteExpenseGroup = async (_id) => {
    const { deletedId, err } = await request({
      url: `/expenseGroups/${_id}`,
      method: 'DELETE',
    });

    setLoading(false);

    if (err || !deletedId) {
      setMessage('error', err || 'Could not delete');
    } else {
      setData(data.filter(({ _id }) => deletedId !== _id));
    }
  };

  return { deleteExpenseGroup };
};

export default useDeleteExpenseGroup;
