import React, { useContext } from 'react';
import { List, ListItem } from '@atomikui/core';
import AppProvider from '../../providers/AppProvider';
import ExpenseGroupDetail from '../ExpenseGroupDetail';

const ExpenseGroups = () => {
  const { data } = useContext(AppProvider.Context);

  const getTotalBalance = (expenses) => {
    return expenses.reduce((total, expense) => {
      return total + expense.balance;
    }, 0);
  };

  return React.useMemo(() => {
    return (
      <List loose>
        {data
          // .sort()
          // .reverse()
          .map(({ title, totalBudget, expenses }, i) => {
            return (
              <ListItem key={`expense-group-${i + 1}`}>
                <ExpenseGroupDetail
                  groupTitle={title}
                  totalBudget={totalBudget}
                  totalBalance={Number(getTotalBalance(expenses))}
                  expenses={expenses}
                />
              </ListItem>
            );
          })}
      </List>
    );
  }, [data]);
};

export default ExpenseGroups;
