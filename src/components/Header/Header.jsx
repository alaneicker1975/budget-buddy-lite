import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ title }) => {
  return (
    <header className="main-header">
      <span>{title}</span>
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
