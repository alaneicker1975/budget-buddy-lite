import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Localbase from 'localbase';

const db = new Localbase('budgetBuddy');

const AppContext = createContext({});

const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState({});
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
          method: 'POST',
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
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const { err } = await response.json();

      if (err) {
        setGlobalMessage({ theme: 'error', text: 'Could not log out' });
      } else {
        setIsLoggedIn(false);
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

  // Geta all expenseGroups
  // -----------------------------------------------------------------
  const getAllExpenseGroups = async () => {
    const data = await db.collection('expenseGroups').get();
    setData(data.reverse());
  };

  // Update expense group
  // -----------------------------------------------------------------
  const updateExpenseGroup = async (json) => {
    const jsonData = json;

    if (jsonData.id !== undefined) {
      await db
        .collection('expenseGroups')
        .doc({ id: jsonData.id })
        .set(jsonData);
    } else {
      await db
        .collection('expenseGroups')
        .add({ ...jsonData, id: Math.round(Math.random() * 100000000) });
    }

    getAllExpenseGroups();
    setShowEditor(false);
  };

  // Deletes an expenseGroup
  // -----------------------------------------------------------------
  const deleteExpenseGroup = (id) => {
    db.collection('expenseGroups').doc({ id }).delete();
    setData(data.filter((doc) => doc.id !== id));
  };

  // Sets the selected expense
  // -----------------------------------------------------------------
  const setSelectedExpenseByIndex = (index) => {
    setSelectedExpense(data[index]);
  };

  const addNewExpenseGroup = () => {
    setSelectedExpense({
      title: '',
      totalBudget: 0,
      expenses: [
        {
          title: '',
          balance: 0,
          paid: false,
        },
      ],
    });
    setShowEditor(true);
  };

  useEffect(() => {
    getAllExpenseGroups();
  }, []);

  return (
    <AppContext.Provider
      value={{
        apiBaseUrl,
        isLoading,
        isLoggedIn,
        setIsLoggedIn,
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
        updateExpenseGroup,
        verifyToken,
        selectedExpense,
        setSelectedExpenseByIndex,
        deleteExpenseGroup,
        addNewExpenseGroup,
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
