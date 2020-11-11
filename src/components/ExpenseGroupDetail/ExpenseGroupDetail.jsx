import React from 'react';
import PropTypes from 'prop-types';
import { Card, List, ListItem, Statistic } from '@atomikui/core';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import formatNumber from '../../utilities/formatNumber';

const ExpenseGroupDetail = ({
  groupTitle,
  totalBudget,
  totalBalance,
  expenses,
}) => {
  const remaingBalance = totalBudget - totalBalance;
  const amountLeftOver = formatNumber(remaingBalance).replace('-', '');
  return (
    <Card
      title={
        <div className="flex flex--space-between text-size-20">
          <span>{groupTitle}</span>
          <span>Budget: ${totalBudget.toLocaleString()}</span>
        </div>
      }
      footer={
        <div className="flex flex--middle flex--space-around">
          <Statistic
            value={`$${formatNumber(totalBalance)}`}
            label="Total Balance"
            size="sm"
            topLabel
          />
          <Statistic
            value={`${remaingBalance < 0 ? '-' : ''}$${amountLeftOver}`}
            label="Remaining Balance"
            size="sm"
            theme={remaingBalance > 0 ? 'lime' : 'red'}
            topLabel
          />
        </div>
      }
    >
      <List loose>
        {expenses.map(({ title, balance, paid }, i) => {
          return (
            <ListItem
              key={`group-${i + 1}`}
              className="flex flex--space-between"
            >
              <div className="text-weight-semibold">
                {title}{' '}
                {paid && (
                  <Icon
                    className="margin-left-4"
                    icon={faCheck}
                    size="sm"
                    color="#d4e157"
                  />
                )}
              </div>
              <div>${formatNumber(balance)}</div>
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
  groupTitle: PropTypes.string,
};

ExpenseGroupDetail.defaultProps = {
  expenses: [],
  totalBalance: 0,
  totalBudget: 0,
  groupTitle: '',
};

export default ExpenseGroupDetail;
