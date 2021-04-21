import React, { useEffect } from 'react';
import useVerifyToken from './hooks/useVerifyToken';
import { useAppContext } from './AppProvider';
import { SET_IS_LOGGED_IN, SET_HISTORY } from './reducers/appStateReducer';

const withRouteGaurd = (Component) => {
  const WithRouteGuard = (props) => {
    const { dispatch } = useAppContext();
    const { verifyToken, error } = useVerifyToken();

    useEffect(() => {
      dispatch({ type: SET_HISTORY, payload: props.history });
      verifyToken();
    }, []);

    useEffect(() => {
      if (error) {
        props.history.push('/');
      } else {
        dispatch({ type: SET_IS_LOGGED_IN, payload: true });
      }
    }, [error]);

    return <Component {...props} />;
  };

  return WithRouteGuard;
};

export default withRouteGaurd;
