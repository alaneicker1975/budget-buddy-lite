import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Localbase from 'localbase';

const db = new Localbase('budgetBuddy');

const AppContext = createContext({});

const AppProvider = ({ children }) => {
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

  // Geta all expenseGroups
  // -----------------------------------------------------------------
  const getAllExpenseGroups = async () => {
    const data = await db
      .collection('expenseGroups')
      .orderBy('id', 'desc')
      .get();
    setData(data);
  };

  // Update expense group
  // -----------------------------------------------------------------
  const updateExpenseGroup = (json) => {
    const updatedDoc = JSON.parse(json);
    db.collection('expenseGroups').doc({ id: updatedDoc.id }).set(updatedDoc);
    setData(data.map((doc) => (doc.id === updatedDoc.id ? updatedDoc : doc)));
    setShowEditor(false);
  };

  // Deletes an expenseGroup
  // -----------------------------------------------------------------
  const deleteExpenseGroup = (id) => {
    console.log(id);
    db.collection('expenseGroups').doc({ id }).delete();
    setData(data.filter((doc) => doc.id !== id));
  };

  // Sets the selected expense
  // -----------------------------------------------------------------
  const setSelectedExpenseByIndex = (index) => {
    setSelectedExpense(data[index]);
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
        updateExpenseGroup,
        verifyToken,
        selectedExpense,
        setSelectedExpenseByIndex,
        deleteExpenseGroup,
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
