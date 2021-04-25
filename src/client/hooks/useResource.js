import { useState } from 'react';
import useSetLoading from './useSetLoading';

const useResource = () => {
  const [error, setError] = useState(false);
  const [data, setData] = useState();
  const [deletedId, setDeletedId] = useState();

  const { setLoading } = useSetLoading();

  const fetchResource = async ({ url, method, body }) => {
    setLoading(true);

    try {
      const response = await fetch(`${process.env.API_BASE_URL}${url}`, {
        method: method || 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const { err, data, deletedId } = await response.json();

      if (err) {
        setError('error', err);
      }

      if (data) {
        setData(data);
      }

      if (deletedId) {
        setDeletedId(deletedId);
      }
    } catch (err) {
      setError('error', err.message);
    }

    setLoading(false);
  };

  return { fetchResource, error, data, deletedId };
};

export default useResource;
