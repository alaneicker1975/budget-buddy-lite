import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext({});

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [globalMessage, setGlobalMessage] = useState(null);
  const [history, setHistory] = useState(null);

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
          reject();
        });
    });
  };

  const logoutUser = () => {
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

  const verifyToken = () => {
    return new Promise((resolve, reject) => {
      fetch(`${apiBaseUrl}/verify-token`)
        .then((res) => {
          return res.json();
        })
        .then(({ isValid }) => {
          if (!isValid) {
            reject();
          }
          resolve();
        })
        .catch((err) => {
          setGlobalMessage({ theme: 'error', text: err.message });
          reject();
        });
    });
  };

  const saveUpdates = (json) => {
    return new Promise((resolve, reject) => {
      fetch(`${apiBaseUrl}/expenses`, {
        method: 'post',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(json),
      })
        .then((res) => {
          return res.json();
        })
        .then(({ err }) => {
          if (err) {
            reject(err);
            return;
          }

          setData(json);
          setShowEditor(false);
          resolve();
        })
        .catch(() => {
          reject('Error: Could not save');
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
        logoutUser,
        authenticateUser,
        saveUpdates,
        verifyToken,
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
