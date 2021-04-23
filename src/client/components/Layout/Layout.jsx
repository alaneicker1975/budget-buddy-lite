import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Drawer, Overlay, Spinner, Alert } from '@atomikui/core';
import { useAppContext } from '../../AppProvider';
import Header from '../Header';
import Editor from '../Editor';

const Layout = ({ children }) => {
  const {
    state: { isLoggedIn, isLoading, globalMessage, showEditor },
  } = useAppContext();

  return (
    <>
      <Overlay isActive={isLoading}>
        <Spinner size="xlg" theme="cyan" />
      </Overlay>
      <div className="layout">
        <Header title="Budget Buddy" />
        <div className="layout__body">
          {isLoggedIn && (
            <Drawer isOpen={showEditor}>
              <Editor />
            </Drawer>
          )}
          <main className="layout__main">
            <div className="layout__content">
              {globalMessage && (
                <Alert theme={globalMessage.theme}>{globalMessage.text}</Alert>
              )}
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
