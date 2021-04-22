import useSetData from './useSetData';
import useSetLoading from './useSetLoading';
import useSetGlobalMessage from './useSetGlobalMessage';

const useFetchExpenseGroups = () => {
  const { setData } = useSetData();
  const { setMessage } = useSetGlobalMessage();
  const { setLoading } = useSetLoading();

  const fetchExpenseGroups = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${process.env.API_BASE_URL}/expenseGroups`);
      const { err, data } = await response.json();

      if (err) {
        setMessage('error', err);
        return;
      }

      setData(data);
      setLoading(false);
    } catch (err) {
      setMessage('error', err.message);
      setLoading(false);
    }
  };

  return { fetchExpenseGroups };
};

export default useFetchExpenseGroups;
