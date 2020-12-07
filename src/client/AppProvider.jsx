import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Localbase from 'localbase';

const db = new Localbase('budgetBuddy');

// db.collection('expenseGroups').add({
//   id: 2,
//   title: 'nov 20, 2020 - Dec 4, 2020',
//   totalBudget: 4480,
//   expenses: [
//     {
//       title: 'Stash',
//       balance: 500,
//       paid: false,
//     },
//     {
//       title: 'Day Care',
//       balance: 940,
//       paid: false,
//     },
//     {
//       title: 'Jeep Car Payment',
//       balance: 359,
//       paid: false,
//     },
//     {
//       title: 'Ford Car Payment',
//       balance: 392,
//       paid: false,
//     },
//     {
//       title: 'Groceries',
//       balance: 400,
//       paid: false,
//     },
//     {
//       title: 'Gas',
//       balance: 70,
//       paid: false,
//     },
//     {
//       title: 'ComEd',
//       balance: 70,
//       paid: false,
//     },
//     {
//       title: 'Nicor',
//       balance: 40,
//       paid: false,
//     },
//     {
//       title: 'T-Mobile',
//       balance: 131,
//       paid: false,
//     },
//     {
//       title: 'Xfinity',
//       balance: 170,
//       paid: false,
//     },
//     {
//       title: 'Gym',
//       balance: 22,
//       paid: false,
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

  // User authentication
  // -----------------------------------------------------------------
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

  // Log out user
  // -----------------------------------------------------------------
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

  // Verify token
  // -----------------------------------------------------------------
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

  // Update expense group
  // -----------------------------------------------------------------
  const saveUpdates = (json) => {
    localStorage.setItem('expenseData', JSON.stringify(json));
    setData(json);
    setShowEditor(false);
  };

  // Geta all expenseGroups
  // -----------------------------------------------------------------
  const getAllExpenseGroups = async () => {
    const data = await db
      .collection('expenseGroups')
      .orderBy('id', 'desc')
      .get();
    setData(data);
  };

  useEffect(() => {
    getAllExpenseGroups();
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
