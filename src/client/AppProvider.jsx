import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import appReducer, { appInitialState } from './reducers/appReducer';

const AppContext = createContext({});

export const useAppContext = () => {
  return useContext(AppContext);
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, appInitialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext, AppProvider };
