import React, { useEffect, useContext } from 'react';
import { AppContext } from './AppProvider';

const withRouteGaurd = (Component) => {
  const WithRouteGuard = (props) => {
    const { setHistory, setIsLoggedIn, verifyToken } = useContext(AppContext);

    // useEffect(() => {
    //   setHistory(props.history);
    //   verifyToken()
    //     .then(() => {
    //       setIsLoggedIn(true);
    //     })
    //     .catch(() => {
    //       props.history.push('/');
    //     });
    // }, []);

    return <Component {...props} />;
  };

  return WithRouteGuard;
};

export default withRouteGaurd;
