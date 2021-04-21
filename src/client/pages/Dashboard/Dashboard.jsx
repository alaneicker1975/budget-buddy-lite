import React, { useEffect } from 'react';
import { List, ListItem } from '@atomikui/core';
import { useAppContext } from '../../AppProvider';
import useFetchExpenseGroups from '../../hooks/useFetchExpenseGroups';
import ExpenseGroupDetail from '../../components/ExpenseGroupDetail';
import withRouteGuard from '../../withRouteGuard';
import {
  SET_DATA,
  SET_IS_LOADING,
  SET_GLOBAL_MESSAGE,
} from '../../reducers/appStateReducer';

const Dashboard = () => {
  const { setGlobalMessage, state, dispatch } = useAppContext();
  const { fetchExpenseGroups, loading, error } = useFetchExpenseGroups();

  const { data } = state;

  const getTotalBalance = (expenses) => {
    return expenses.reduce((total, expense) => {
      return total + expense.balance;
    }, 0);
  };

  const getUpaidBalance = (expenses) => {
    return expenses
      .filter((exp) => {
        return !exp.paid;
      })
      .reduce((total, expense) => {
        return total + expense.balance;
        ``;
      }, 0);
  };

  useEffect(() => {
    fetchExpenseGroups().then((res) =>
      dispatch({ type: SET_DATA, payload: res }),
    );
  }, []);

  useEffect(() => {
    dispatch({
      type: setGlobalMessage,
      payload: error ? { theme: 'error', text: error } : null,
    });
  }, [error]);

  useEffect(() => {
    dispatch({ type: SET_IS_LOADING, payload: loading });
  }, [loading]);

  return React.useMemo(() => {
    return (
      <div className="padding-bottom-24">
        <List loose>
          {data.map(({ _id, title, totalBudget, expenses }) => (
            <ListItem key={`expense-group-${_id}`}>
              <ExpenseGroupDetail
                id={_id}
                groupTitle={title}
                totalBudget={totalBudget}
                totalBalance={getTotalBalance(expenses)}
                unpaidBalance={getUpaidBalance(expenses)}
                expenses={expenses}
              />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }, [data]);
};

export default withRouteGuard(Dashboard);
