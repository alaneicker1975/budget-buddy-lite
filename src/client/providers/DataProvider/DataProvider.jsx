import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const Context = createContext({});

const DataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [editorIsOpen, setEditorIsOpen] = useState(false);

  const apiBaseUrl = window.location.href.includes('localhost')
    ? 'http://localhost:9000/api'
    : 'path/to/prod';

  useEffect(() => {
    setIsLoading(true);

    fetch(`${apiBaseUrl}/expenses`)
      .then((res) => {
        setIsLoading(false);
        return res.json();
      })
      .then((resData) => {
        return setData(resData);
      });
  }, []);

  return (
    <Context.Provider
      value={{
        apiBaseUrl,
        isLoading,
        data,
        setData,
        editorIsOpen,
        setEditorIsOpen,
      }}
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
