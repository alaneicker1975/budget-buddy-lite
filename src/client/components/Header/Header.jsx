import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, List, ListItem } from '@atomikui/core';
import useLogout from '../../hooks/useLogout';
import useAddExpenseGroup from '../../hooks/useAddExpenseGroup';
import { useAppContext } from '../../AppProvider';
import { version } from '../../../../package.json';

const Header = ({ title }) => {
  const { state } = useAppContext();
  const { logoutUser } = useLogout();
  const { addExpenseGroup } = useAddExpenseGroup();
  const { history, isLoggedIn } = state;

  useEffect(() => {
    if (!isLoggedIn) {
      // history.push('/');
    }
  }, [isLoggedIn, history]);

  return (
    <header className="main-header">
      <div className="main-header__logo">
        <span className="main-header__text">{title}</span>{' '}
        <span className="main-header__version">v{version}</span>
      </div>
      {isLoggedIn && (
        <List type="horizontal">
          <ListItem>
            <Button size="sm" onClick={addExpenseGroup}>
              + New Group
            </Button>
          </ListItem>
          <ListItem>
            <Button size="sm" theme="blue-gray" onClick={logoutUser}>
              Log Out
            </Button>
          </ListItem>
        </List>
      )}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

Header.defaultProps = {
  title: '',
};

export default Header;
