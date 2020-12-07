import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Localbase from 'localbase';

const db = new Localbase('budgetBuddy');

// db.collection('expenseGroups').add({
//   title: 'Nov 6, 2020 - Nov 20, 2020',
//   totalBudget: 4480,
//   expenses: [
//     {
//       title: 'Mortgage',
//       balance: 1941,
//       paid: true,
//     },
//     {
//       title: 'Day Care',
//       balance: 940,
//       paid: true,
//     },
//     {
//       title: 'Stash',
//       balance: 500,
//       paid: true,
//     },
//     {
//       title: 'Groceries',
//       balance: 500,
//       paid: true,
//     },
//     {
//       title: 'Gas',
//       balance: 70,
//       paid: true,
//     },
//     {
//       title: 'College Funds',
//       balance: 300,
//       paid: true,
//     },
//   ],
// });

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

    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${apiBaseUrl}/authenticate`, {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pin }),
        });

        const { err } = await response.json();

        if (err) {
          setGlobalMessage({ theme: 'error', text: err });
          reject();
        } else {
          setGlobalMessage(null);
          resolve();
          history.push('/dashboard');
        }

        setIsLoading(false);
      } catch (err) {
        setGlobalMessage({
          theme: 'error',
          text: err.message,
        });
        setIsLoading(false);
        reject();
      }
    });
  };

  const logoutUser = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/logout`, {
        method: 'delete',
      });

      const { err } = await response.json();

      if (err) {
        setGlobalMessage({ theme: 'error', text: 'Could not log out' });
      } else {
        history.push('/');
      }
    } catch (err) {
      setGlobalMessage({
        theme: 'error',
        text: err.message,
      });
    }
  };

  const verifyToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${apiBaseUrl}/verify-token`);
        const { isValid } = await response.json();
        if (!isValid) {
          reject();
        }
        resolve();
      } catch (err) {
        setGlobalMessage({ theme: 'error', text: err.message });
        reject();
      }
    });
  };

  const saveUpdates = (json) => {
    localStorage.setItem('expenseData', JSON.stringify(json));
    setData(json);
    setShowEditor(false);
  };

  useEffect(() => {
    //const data = JSON.parse(localStorage.getItem('expenseData')) || [];
    db.collection('expenseGroups')
      .get()
      .then((expenses) => {
        setData(expenses);
      });
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
