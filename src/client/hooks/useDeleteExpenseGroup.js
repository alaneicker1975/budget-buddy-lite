import { useAppContext } from '../AppProvider';
import useSetData from '../hooks/useSetData';
import useSetGlobalMessage from './useSetGlobalMessage';
import useSetLoading from '../hooks/useSetLoading';

const useDeleteExpenseGroup = () => {
  const { state } = useAppContext();
  const { setData } = useSetData();
  const { setMessage } = useSetGlobalMessage();
  const { setLoading } = useSetLoading();

  const { data } = state;

  const deleteExpenseGroup = async (_id) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.API_BASE_URL}/expenseGroups/${_id}`,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );

      const { deletedId, err } = await response.json();

      setLoading(false);

      if (err || !deletedId) {
        setMessage('error', err || 'Could not delete');
      } else {
        setData(data.filter(({ _id }) => deletedId !== _id));
      }
    } catch (err) {
      setMessage('error', err.message);
      setLoading(false);
    }
  };

  return { deleteExpenseGroup };
};

export default useDeleteExpenseGroup;
