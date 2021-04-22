import useShowEditor from './useShowEditor';
import useSetSelecedExpense from './useSetSelecedExpense';

const useAddExpenseGroup = () => {
  const { setExpense } = useSetSelecedExpense();
  const { setShowEditor } = useShowEditor();

  const addExpenseGroup = () => {
    setExpense({
      title: '',
      totalBudget: 0,
      expenses: [
        {
          title: '',
          balance: 0,
          paid: false,
        },
      ],
    });

    setShowEditor(true);
  };

  return { addExpenseGroup };
};

export default useAddExpenseGroup;
