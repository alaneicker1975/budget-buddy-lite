import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, List, ListItem, Statistic, Button } from '@atomikui/core';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import formatNumber from '../../utilities/formatNumber';
import { AppContext } from '../../AppProvider';

const ExpenseGroupDetail = ({
  index,
  id,
  groupTitle,
  totalBudget,
  totalBalance,
  unpaidBalance,
  expenses,
}) => {
  const {
    deleteExpenseGroup,
    setShowEditor,
    setSelectedExpenseByIndex,
  } = useContext(AppContext);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const remaingBalance = totalBudget - totalBalance;
  const amountLeftOver = formatNumber(remaingBalance).replace('-', '');

  const initiateUpdate = () => {
    setSelectedExpenseByIndex(index);
    setShowEditor(true);
  };

  const confirmDelete = () => {
    deleteExpenseGroup(id);
    setShowDeleteConfirm(false);
  };

  return (
    <Card
      title={
        <>
          <div className="flex flex--space-between text-size-16">
            <span>{groupTitle}</span>
            <div className="flex flex--align-middle">
              <span
                style={{
                  marginRight: '16px',
                  paddingRight: '16px',
                  borderRight: '1px solid #607d8b',
                }}
              >
                Budget: ${totalBudget.toLocaleString()}
              </span>
              <List type="horizontal">
                <ListItem>
                  <Button size="md" onClick={initiateUpdate}>
                    Update
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    size="md"
                    theme="red"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    Delete
                  </Button>
                </ListItem>
              </List>
            </div>
          </div>
          {showDeleteConfirm && (
            <div className="text-align-center bg-color-blue-gray-700 margin-top-16">
              <div className="text-weight-semibold text-size-16 padding-16">
                <p
                  className="margin-bottom-8"
                  style={{ textTransform: 'Capitalize' }}
                >
                  Are you sure you want to delete this group?
                </p>
                <List type="horizontal">
                  <ListItem>
                    <Button size="md" theme="red" onClick={confirmDelete}>
                      Delete
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Button
                      size="md"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      Cancel
                    </Button>
                  </ListItem>
                </List>
              </div>
            </div>
          )}
        </>
      }
      footer={
        <Grid>
          <Row>
            <Col sm={4} className="text-align-center">
              <Statistic
                value={`$${formatNumber(totalBalance)}`}
                label="Total Balance"
                size="sm"
                topLabel
              />
              <div className="margin-bottom-16 display-none@small" />
            </Col>
            <Col sm={4} className="text-align-center">
              <Statistic
                value={`$${formatNumber(unpaidBalance)}`}
                label="Unpaid Balance"
                size="sm"
                theme={unpaidBalance > 0 ? 'red' : 'lime'}
                topLabel
              />
              <div className="margin-bottom-16 display-none@small" />
            </Col>
            <Col sm={4} className="text-align-center">
              <Statistic
                value={`${remaingBalance < 0 ? '-' : ''}$${amountLeftOver}`}
                label="Left Over Balance"
                size="sm"
                theme={remaingBalance > 0 ? 'lime' : 'red'}
                topLabel
              />
            </Col>
          </Row>
        </Grid>
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
  index: PropTypes.number,
  id: PropTypes.number,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      balance: PropTypes.number,
    }),
  ),
  totalBalance: PropTypes.number,
  totalBudget: PropTypes.number,
  unpaidBalance: PropTypes.number,
  groupTitle: PropTypes.string,
};

ExpenseGroupDetail.defaultProps = {
  index: null,
  id: null,
  expenses: [],
  totalBalance: 0,
  totalBudget: 0,
  unpaidBalance: 0,
  groupTitle: '',
};

export default ExpenseGroupDetail;
