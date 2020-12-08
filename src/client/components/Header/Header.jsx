import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, List, ListItem } from '@atomikui/core';
import { AppContext } from '../../AppProvider';

const Header = ({ title, showHeaderNav }) => {
  const { logoutUser, addNewExpenseGroup } = useContext(AppContext);

  return (
    <header className="main-header">
      <span>{title}</span>
      {showHeaderNav && (
        <List type="horizontal">
          <ListItem>
            <Button size="sm" theme="blue" onClick={addNewExpenseGroup}>
              New Group
            </Button>
          </ListItem>
          <ListItem>
            <Button size="sm" theme="gray" onClick={logoutUser}>
              Log Out
            </Button>
          </ListItem>
        </List>
      )}
    </header>
  );
};

Header.propTypes = {
  showHeaderNav: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

Header.defaultProps = {
  showHeaderNav: false,
  title: '',
};

export default Header;
