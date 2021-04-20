import { useAppContext } from '../../AppProvider';

const useAuthenticateUser = () => {
  const { setIsLoading, setGlobalMessage, history } = useAppContext();

  const authenticate = async (userData) => {
    setIsLoading(true);

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
        setGlobalMessage({ theme: 'error', text: err });
      } else {
        setGlobalMessage(null);
        history.push('/dashboard');
      }

      setIsLoading(false);
    } catch (err) {
      setGlobalMessage({
        theme: 'error',
        text: err.message,
      });
      setIsLoading(false);
    }
  };

  return { authenticate };
};

export default useAuthenticateUser;
