import React, { useContext, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  List,
  ListItem,
  Statistic,
  Button,
  Overlay,
} from '@atomikui/core';
import { createFocusTrap } from 'focus-trap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faExclamationCircle,
  faTrashAlt,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../../AppProvider';
import useDeleteExpenseGroup from '../../hooks/useDeleteExpenseGroup';
import formatNumber from '../../utilities/formatNumber';

const ExpenseGroupDetail = ({
  id,
  groupTitle,
  totalBudget,
  totalBalance,
  unpaidBalance,
  expenses,
}) => {
  const {
    data,
    setData,
    setShowEditor,
    setIsLoading,
    setGlobalMessage,
    setSelectedExpenseById,
  } = useAppContext();

  const {
    deleteExpenseGroup,
    error,
    loading,
    deletedId,
  } = useDeleteExpenseGroup();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState();
  const [focusTrap, setFocusTrap] = useState();

  const deleteConfirmRef = useRef();

  const remaingBalance = totalBudget - totalBalance;
  const amountLeftOver = formatNumber(remaingBalance).replace('-', '');

  const initiateUpdate = () => {
    setSelectedExpenseById(id);
    setShowEditor(true);
  };

  const confirmDelete = () => {
    deleteExpenseGroup(id);
    setShowDeleteConfirm(false);
  };

  useEffect(() => {
    if (deletedId) {
      setData(data.filter(({ _id }) => deletedId !== _id));
    }
  }, [deletedId]);

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

  useEffect(() => {
    setFocusTrap(
      createFocusTrap(deleteConfirmRef.current, {
        escapeDeactivates: false,
        fallbackFocus: deleteConfirmRef,
      }),
    );
  }, []);

  useEffect(() => {
    if (focusTrap) {
      focusTrap[showDeleteConfirm ? 'activate' : 'deactivate']();
    }
  }, [showDeleteConfirm, focusTrap]);

  return (
    <Card
      title={
        <>
          <div className="flex@medium flex--align-middle flex--space-between">
            <div className="text-align-center">
              <span className="text-weight-bold">{groupTitle}</span>
            </div>
            <div className="text-align-center">
              <div className="margin-top-12 display-block display-none@medium" />
              <List type="horizontal">
                <ListItem>
                  <Button
                    size="sm"
                    theme="blue-gray"
                    onClick={initiateUpdate}
                    aria-label="update"
                    title="update"
                    className="expense-group-action-btn"
                  >
                    <Icon icon={faEdit} color="white" />{' '}
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    size="sm"
                    theme="blue-gray"
                    onClick={() => setShowDeleteConfirm(true)}
                    aria-label="delete"
                    title="delete"
                    className="expense-group-action-btn"
                  >
                    <Icon icon={faTrashAlt} color="white" />{' '}
                  </Button>
                </ListItem>
              </List>
            </div>
          </div>
          <Overlay
            isActive={showDeleteConfirm}
            style={{ position: 'absolute' }}
          >
            <div
              ref={deleteConfirmRef}
              className="text-weight-semibold text-align-center text-size-16 padding-16"
            >
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
    >
      <div className="flex@medium">
        <List className="flex__item--grow">
          {expenses.map(({ title, balance, paid }, i) => {
            return (
              <ListItem
                key={`group-${i + 1}`}
                className="flex flex--space-between padding-16"
                style={{
                  background: i % 2 === 0 ? '#2a2e38' : 'transparent',
                }}
              >
                <div className="text-weight-semibold">
                  <Icon
                    className="margin-right-8"
                    icon={paid ? faCheckCircle : faExclamationCircle}
                    color={paid ? '#d4e157' : '#f44336'}
                  />
                  {title}
                </div>
                <div>${formatNumber(balance)}</div>
              </ListItem>
            );
          })}
        </List>
        <div className="expense-group-summary">
          <Statistic
            value={`$${totalBudget.toLocaleString()}`}
            label="Total Budget"
            size="md"
            topLabel
          />
          <hr />
          <div className="margin-bottom-30">
            <Statistic
              value={`$${formatNumber(totalBalance)}`}
              label="Total Balance"
              size="sm"
              topLabel
            />
          </div>
          <div className="margin-bottom-30">
            <Statistic
              value={`$${formatNumber(unpaidBalance)}`}
              label="Unpaid Balance"
              size="sm"
              theme="red"
              topLabel
            />
          </div>
          <Statistic
            value={`${remaingBalance < 0 ? '-' : ''}$${amountLeftOver}`}
            label="Left Over Balance"
            size="sm"
            theme="lime"
            topLabel
          />
        </div>
      </div>
    </Card>
  );
};

ExpenseGroupDetail.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
  id: null,
  expenses: [],
  totalBalance: 0,
  totalBudget: 0,
  unpaidBalance: 0,
  groupTitle: '',
};

export default ExpenseGroupDetail;
