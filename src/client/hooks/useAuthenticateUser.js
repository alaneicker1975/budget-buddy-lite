import useSetLoading from './useSetLoading';
import useSetGlobalMessage from './useSetGlobalMessage';
import request from '../utilities/request';

const useAuthenticateUser = (history) => {
  const { setLoading } = useSetLoading();
  const { setMessage } = useSetGlobalMessage();

  const authenticate = async (userData) => {
    setLoading(true);

    const { err } = await request({
      url: '/user/authenticate',
      method: 'POST',
      body: userData,
    });

    if (err) {
      setMessage('error', err);
      setLoading(false);
    } else {
      history.push('/dashboard');
      setMessage();
    }
  };

  return { authenticate };
};

export default useAuthenticateUser;
