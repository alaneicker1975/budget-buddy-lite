import useSetData from './useSetData';
import useSetLoading from './useSetLoading';
import useSetGlobalMessage from './useSetGlobalMessage';
import request from '../utilities/request';

const useFetchExpenseGroups = () => {
  const { setData } = useSetData();
  const { setMessage } = useSetGlobalMessage();
  const { setLoading } = useSetLoading();

  const fetchExpenseGroups = async () => {
    setLoading(true);

    const { err, data } = await request({ url: '/expenseGroups' });

    if (err) {
      setMessage('error', err);
      setLoading(false);
      return;
    }

    setData(data);

    setLoading(false);
  };

  return { fetchExpenseGroups };
};

export default useFetchExpenseGroups;
