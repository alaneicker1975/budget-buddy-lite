import { useState } from 'react';
import request from '../utilities/request';

const useVerifyToken = () => {
  const [error, setError] = useState();

  const verifyToken = async () => {
    const { isValid } = await request({ url: '/user/verify-token' });

    if (!isValid) {
      setError(true);
    }
  };

  return { verifyToken, error };
};

export default useVerifyToken;
