import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@atomikui/core';
import DataProvider from '../../providers/DataProvider';

const Header = ({ title }) => {
  const { setEditorIsOpen } = useContext(DataProvider.Context);

  return (
    <header className="main-header">
      <span>{title}</span>
      <Button
        size="sm"
        theme="teal"
        onClick={() => {
          return setEditorIsOpen(true);
        }}
      >
        Update Data
      </Button>
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
