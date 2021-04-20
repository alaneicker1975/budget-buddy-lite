import { useState } from 'react';

const useAuthenticateUser = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const authenticate = async (userData) => {
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_BASE_URL}/user/authenticate`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        },
      );

      const { err } = await response.json();

      if (err) {
        setError(err);
        setLoading(false);
      } else {
        setError(null);
        setLoggedIn(true);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { authenticate, error, loading, loggedIn };
};

export default useAuthenticateUser;
