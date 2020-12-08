import React, { useContext } from 'react';
import { List, ListItem } from '@atomikui/core';
import { AppContext } from '../../AppProvider';
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
      <div className="padding-bottom-24">
        <List loose>
          {data.map(({ id, title, totalBudget, expenses }, index) => (
            <ListItem key={`expense-group-${index + 1}`}>
              <ExpenseGroupDetail
                id={id}
                index={index}
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

export default ExpenseGroups;
