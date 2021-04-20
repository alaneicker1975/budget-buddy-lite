import React, { useEffect, useContext } from 'react';
import { AppContext } from './AppProvider';
import useVerifyToken from './hooks/useVerifyToken';

const withRouteGaurd = (Component) => {
  const WithRouteGuard = (props) => {
    const { verifyToken, error } = useVerifyToken();
    const { setHistory, setIsLoggedIn } = useContext(AppContext);

    useEffect(() => {
      setHistory(props.history);
      verifyToken();
    }, []);

    useEffect(() => {
      if (error) {
        props.history.push('/');
      } else {
        setIsLoggedIn(true);
      }
    }, [error]);

    return <Component {...props} />;
  };

  return WithRouteGuard;
};

export default withRouteGaurd;
