import React, { useContext } from 'react';
import { List, ListItem } from '@atomikui/core';
import { AppContext } from '../../providers/AppProvider';
import ExpenseGroupDetail from '../ExpenseGroupDetail';

const ExpenseGroups = () => {
  const { data } = useContext(AppContext);

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

  return React.useMemo(() => {
    return (
      <List loose>
        {data.map(({ title, totalBudget, expenses }, i) => {
          return (
            <ListItem key={`expense-group-${i + 1}`}>
              <ExpenseGroupDetail
                groupTitle={title}
                totalBudget={totalBudget}
                totalBalance={getTotalBalance(expenses)}
                unpaidBalance={getUpaidBalance(expenses)}
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
