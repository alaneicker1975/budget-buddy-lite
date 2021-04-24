import useSetLoading from './useSetLoading';
import useSetGlobalMessage from './useSetGlobalMessage';

const useAuthenticateUser = (history) => {
  const { setLoading } = useSetLoading();
  const { setMessage } = useSetGlobalMessage();

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

      setLoading(false);

      if (err) {
        setMessage('error', err);
      } else {
        history.push('/dashboard');
        setMessage();
      }
    } catch (err) {
      setMessage('error', err.message);
    }
  };

  return { authenticate };
};

export default useAuthenticateUser;
