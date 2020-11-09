import React from 'react';
import PropTypes from 'prop-types';
import { Card, List, ListItem } from '@atomikui/core';

const ExpenseGroupDetail = ({ title, totalBudget, totalBalance, expenses }) => {
  const amountLeftOver = (totalBudget - totalBalance).toFixed(2);
  return (
    <Card
      title={
        <div className="flex flex--space-between text-size-20">
          <span>{title}</span>
          <span>Budget: ${totalBudget.toFixed(2)}</span>
        </div>
      }
      footer={
        <List className="text-align-right" loose>
          <ListItem className="text-weight-semibold">
            <span>Total Balance:</span> ${totalBalance.toFixed(2)}
          </ListItem>
          <ListItem className="text-weight-semibold">
            <span>Left Over:</span>{' '}
            <span
              className={
                amountLeftOver > 0
                  ? 'text-color-green-700'
                  : 'text-color-red-700'
              }
            >
              {amountLeftOver <= 0 && '-'}${amountLeftOver.replace('-', '')}
            </span>
          </ListItem>
        </List>
      }
    >
      <List loose>
        {expenses.map(({ title, balance }, i) => {
          return (
            <ListItem
              key={`group-${i + 1}`}
              className="flex flex--space-between"
            >
              <div className="text-weight-semibold">{title}</div>
              <div>${balance.toFixed(2)}</div>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};

ExpenseGroupDetail.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      balance: PropTypes.number,
    }),
  ),
  totalBalance: PropTypes.number,
  totalBudget: PropTypes.number,
  title: PropTypes.string,
};

ExpenseGroupDetail.defaultProps = {
  expenses: [],
  totalBalance: 0,
  totalBudget: 0,
  title: '',
};

export default ExpenseGroupDetail;
