import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import data from '../../data.yaml';

export const Context = createContext({});

const DataProvider = ({ children }) => {
  return <Context.Provider value={data}>{children}</Context.Provider>;
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

DataProvider.Context = Context;

export default DataProvider;
