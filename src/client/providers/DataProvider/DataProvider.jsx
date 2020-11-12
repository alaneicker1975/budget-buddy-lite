import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import json from '../../../data.json';

export const Context = createContext({});

const DataProvider = ({ children }) => {
  const [data, setData] = useState(json);
  const [editorIsOpen, setEditorIsOpen] = useState(false);

  const saveAndUpdate = async (updatedJson) => {
    try {
      const response = await fetch('http://localhost:9000/api/expenses', {
        method: 'post',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(updatedJson),
      });
      const { status } = await response.json();
      console.log(status);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Context.Provider
      value={{ data, setData, editorIsOpen, setEditorIsOpen, saveAndUpdate }}
    >
      {children}
    </Context.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

DataProvider.Context = Context;

export default DataProvider;
