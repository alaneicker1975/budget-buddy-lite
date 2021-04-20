import React, { useEffect } from 'react';
import { List, ListItem } from '@atomikui/core';
import { useAppContext } from '../../AppProvider';
import useFetchExpenseGroups from '../../hooks/useFetchExpenseGroups';
import ExpenseGroupDetail from '../../components/ExpenseGroupDetail';
import withRouteGuard from '../../withRouteGuard';

const Dashboard = () => {
  const { setGlobalMessage, setIsLoading } = useAppContext();
  const { fetchExpenseGroups, loading, error, data } = useFetchExpenseGroups();

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
      }, 0);
  };

  useEffect(() => {
    fetchExpenseGroups();
  }, []);

  useEffect(() => {
    if (!!error) {
      setGlobalMessage({ theme: 'error', text: error });
    } else {
      setGlobalMessage(null);
    }
  }, [error]);

  useEffect(() => {
    setIsLoading(loading);
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
