import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  List,
  ListItem,
  Statistic,
  Button,
  Overlay,
} from '@atomikui/core';
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
          <div className="flex flex--space-between">
            <span>{groupTitle}</span>
            <div className="flex flex--align-middle">
              <span>Budget: ${totalBudget.toLocaleString()}</span>
              <List
                type="horizontal"
                style={{
                  marginLeft: '16px',
                  paddingLeft: '16px',
                  borderLeft: '1px solid #607d8b',
                }}
              >
                <ListItem>
                  <Button size="sm" onClick={initiateUpdate}>
                    Update
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    size="sm"
                    theme="red"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    Delete
                  </Button>
                </ListItem>
              </List>
            </div>
          </div>
          <Overlay
            isActive={showDeleteConfirm}
            style={{ position: 'absolute' }}
          >
            <div className="text-weight-semibold text-align-center text-size-16 padding-16">
              <p className="margin-bottom-16">
                Are you sure you want to delete this group?
              </p>
              <List type="horizontal">
                <ListItem>
                  <Button size="md" theme="red" onClick={confirmDelete}>
                    Delete
                  </Button>
                </ListItem>
                <ListItem>
                  <Button size="md" onClick={() => setShowDeleteConfirm(false)}>
                    Cancel
                  </Button>
                </ListItem>
              </List>
            </div>
          </Overlay>
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
      <List>
        {expenses.map(({ title, balance, paid }, i) => {
          return (
            <ListItem
              key={`group-${i + 1}`}
              className="flex flex--space-between padding-16"
              style={{
                background: i % 2 === 0 ? '#3d4e57' : 'transparent',
              }}
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
