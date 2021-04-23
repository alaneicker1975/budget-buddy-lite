import React, { useEffect } from 'react';
import useVerifyToken from './hooks/useVerifyToken';
import useSetHistory from './hooks/useSetHistory';
import useSetIsLoggedIn from './hooks/useSetIsLoggedIn';
import { useAppContext } from './AppProvider';

const withRouteGaurd = (Component) => {
  const WithRouteGuard = (props) => {
    const { verifyToken, error } = useVerifyToken();
    const { setHistory } = useSetHistory();
    const { setLoggedIn } = useSetIsLoggedIn();
    const {
      state: { isLoggedIn },
    } = useAppContext();

    useEffect(() => {
      setHistory(props.history);
      verifyToken();
    }, []);

    useEffect(() => {
      if (error) {
        props.history.push('/');
      } else {
        setLoggedIn(true);
      }
    }, [error]);

    return <Component {...props} />;
  };

  return WithRouteGuard;
};

export default withRouteGaurd;
