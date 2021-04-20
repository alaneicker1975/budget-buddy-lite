import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Localbase from 'localbase';

const db = new Localbase('budgetBuddy');

const AppContext = createContext({});

export const useAppContext = () => {
  return useContext(AppContext);
};

const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState({});
  const [globalMessage, setGlobalMessage] = useState(null);
  const [history, setHistory] = useState(null);

  const apiBaseUrl = process.env.API_BASE_URL;

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

    //getAllExpenseGroups();
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
  const setSelectedExpenseById = async (id) => {
    try {
      const response = await fetch(`${apiBaseUrl}/expenseGroups/${id}`);
      const { err, data } = await response.json();

      if (err) {
        setGlobalMessage({
          theme: 'error',
          text: err,
        });

        return;
      }

      setSelectedExpense(data);
    } catch (err) {
      setGlobalMessage({
        theme: 'error',
        text: err.message,
      });
    }
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

  return (
    <AppContext.Provider
      value={{
        apiBaseUrl,
        isLoading,
        isLoggedIn,
        setIsLoggedIn,
        showEditor,
        setShowEditor,
        globalMessage,
        setGlobalMessage,
        setIsLoading,
        history,
        setHistory,
        updateExpenseGroup,
        selectedExpense,
        setSelectedExpenseById,
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
