import { useState } from 'react';

const useDeleteExpenseGroup = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [deletedId, setDeletedId] = useState();

  const deleteExpenseGroup = async (id) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.API_BASE_URL}/expenseGroups/${id}`,
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
        setError(err);
      } else {
        setDeletedId(deletedId);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  return { deleteExpenseGroup, error, loading, deletedId };
};

export default useDeleteExpenseGroup;
