import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const Context = createContext({});

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [editorIsOpen, setEditorIsOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:9000/api/expenses')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return setData(data);
      });
  }, []);

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
