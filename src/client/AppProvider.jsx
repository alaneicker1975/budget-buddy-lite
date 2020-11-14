import dotenv from 'dotenv-flow';
import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

dotenv.config();

const AppContext = createContext({});

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [globalMessage, setGlobalMessage] = useState(null);

  const apiBaseUrl = process.env.API_BASE_URL;

  const authenticateUser = (pin) => {
    console.log(pin);
  };

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
    <AppContext.Provider
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
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext, AppProvider };
