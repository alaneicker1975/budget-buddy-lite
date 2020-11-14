import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Drawer, Overlay, Spinner, Alert } from '@atomikui/core';
import { AppContext } from '../../providers/AppProvider';
import Header from '../Header';
import Editor from '../Editor';

const Layout = ({ children }) => {
  const { showEditor, isLoading, globalMessage } = useContext(AppContext);
  const { pathname } = useLocation();
  const isDashboard = pathname === '/dashboard';

  return (
    <>
      <Overlay isActive={isLoading}>
        <Spinner size="xlg" theme="cyan" />
      </Overlay>
      <div className="layout">
        <Header title="Budget Buddy Lite" showHeaderNav={isDashboard} />
        <div className="layout__body">
          {isDashboard && (
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
