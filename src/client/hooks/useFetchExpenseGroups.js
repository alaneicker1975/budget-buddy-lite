import { useState } from 'react';

const useFetchExpenseGroups = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const fetchExpenseGroups = async () => {
    try {
      const response = await fetch(`${process.env.API_BASE_URL}/expenseGroups`);
      const { err, data } = await response.json();

      if (err) {
        setError(err);
        return;
      }

      setLoading(false);

      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { fetchExpenseGroups, error, loading };
};

export default useFetchExpenseGroups;
