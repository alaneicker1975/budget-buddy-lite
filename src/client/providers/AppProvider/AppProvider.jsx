import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const Context = createContext({});

const DataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [globalMessage, setGlobalMessage] = useState(null);

  const apiBaseUrl = window.location.href.includes('localhost')
    ? 'http://localhost:9000/api'
    : 'path/to/prod';

  const authenticateUser = (pin) => {};

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/expenses`);
        const resData = await response.json();
        setIsLoading(false);
        setData(resData);
      } catch (err) {
        setIsLoading(false);
        setGlobalMessage({
          theme: 'error',
          text: err.message,
        });
      }
    };

    fetchData();
  }, []);

  return (
    <Context.Provider
      value={{
        apiBaseUrl,
        isLoading,
        data,
        setData,
        showEditor,
        setShowEditor,
        authenticateUser,
        globalMessage,
        setGlobalMessage,
        setIsLoading,
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
