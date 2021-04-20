import { useState } from 'react';

const useVerifyToken = () => {
  const [error, setError] = useState();

  const verifyToken = async () => {
    try {
      const response = await fetch(
        `${process.env.API_BASE_URL}/user/verify-token`,
      );

      const { isValid } = await response.json();

      if (!isValid) {
        setError(true);
        return;
      }

      setError(null);
    } catch (err) {
      setError(true);
    }
  };

  return { verifyToken, error };
};

export default useVerifyToken;
