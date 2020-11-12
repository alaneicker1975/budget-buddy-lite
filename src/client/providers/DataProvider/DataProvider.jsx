import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import json from '../../../../static/data.json';

export const Context = createContext({});

const DataProvider = ({ children }) => {
  const [data, setData] = useState(json);
  const [editorIsOpen, setEditorIsOpen] = useState(false);

  return (
    <Context.Provider value={{ data, setData, editorIsOpen, setEditorIsOpen }}>
      {children}
    </Context.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

DataProvider.Context = Context;

export default DataProvider;
