import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import appStateReducer, { appInitialState } from './reducers/appStateReducer';

const AppContext = createContext({});

export const useAppContext = () => {
  return useContext(AppContext);
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appStateReducer, appInitialState);

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

  const addNewExpenseGroup = () => {
    dispatch({
      type: SET_SELECTED_EXPENSE,
      payload: {
        title: '',
        totalBudget: 0,
        expenses: [
          {
            title: '',
            balance: 0,
            paid: false,
          },
        ],
      },
    });
    dispatch({ type: SET_SHOW_EDITOR, payload: true });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        updateExpenseGroup,
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
