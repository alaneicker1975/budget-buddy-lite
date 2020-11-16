import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext({});

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [globalMessage, setGlobalMessage] = useState(null);
  const [history, setHistory] = useState();

  const apiBaseUrl = process.env.API_BASE_URL;

  const authenticateUser = (pin) => {
    setIsLoading(true);

    return new Promise((resolve, reject) => {
      fetch(`${apiBaseUrl}/authenticate`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pin }),
      })
        .then((res) => {
          return res.json();
        })
        .then(({ err }) => {
          if (err) {
            setGlobalMessage({ theme: 'error', text: err });
            reject();
          } else {
            setGlobalMessage(null);
            resolve();
            history.push('/dashboard');
          }

          setIsLoading(false);
        })
        .catch((err) => {
          setGlobalMessage({
            theme: 'error',
            text: err.message,
          });
          setIsLoading(false);
        });
    });
  };

  const logout = () => {
    fetch(`${apiBaseUrl}/logout`, {
      method: 'delete',
    })
      .then((res) => {
        return res.json();
      })
      .then(({ err }) => {
        if (err) {
          setGlobalMessage({ theme: 'error', text: 'Could not log out' });
        } else {
          history.push('/');
        }
      })
      .catch((err) => {
        setGlobalMessage({
          theme: 'error',
          text: err.message,
        });
      });
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
        globalMessage,
        setGlobalMessage,
        setIsLoading,
        setHistory,
        logout,
        authenticateUser,
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
