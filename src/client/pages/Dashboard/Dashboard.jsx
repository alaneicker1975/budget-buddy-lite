import React, { useEffect } from 'react';
import { List, ListItem } from '@atomikui/core';
import { useAppContext } from '../../AppProvider';
import useFetchExpenseGroups from '../../hooks/useFetchExpenseGroups';
import ExpenseGroupDetail from '../../components/ExpenseGroupDetail';
import withRouteGuard from '../../withRouteGuard';

const Dashboard = () => {
  const { state } = useAppContext();
  const { fetchExpenseGroups } = useFetchExpenseGroups();
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

  useEffect(() => fetchExpenseGroups(), []);

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
