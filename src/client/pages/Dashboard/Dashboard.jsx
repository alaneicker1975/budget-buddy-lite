import React, { useContext } from 'react';
import { List, ListItem } from '@atomikui/core';
import { AppContext } from '../../AppProvider';
import ExpenseGroupDetail from '../../components/ExpenseGroupDetail';
import withRouteGuard from '../../withRouteGuard';

const Dashboard = () => {
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
