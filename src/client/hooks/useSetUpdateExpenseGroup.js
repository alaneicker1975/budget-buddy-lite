import { useAppContext } from '../AppProvider';
import useSetData from './useSetData';

const useSetUpdateExpenseGroup = () => {
  const {
    state: { data },
  } = useAppContext();

  const { setData } = useSetData();

  const updateExpenseGroup = (payload, _id) => {
    const updatedData = _id
      ? data.map((item) => (item._id === _id ? payload : item))
      : [payload, ...data];

    setData(updatedData);
  };

  return { updateExpenseGroup };
};

export default useSetUpdateExpenseGroup;
