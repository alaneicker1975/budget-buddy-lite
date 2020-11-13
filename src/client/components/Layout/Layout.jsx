import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Drawer, Overlay, Spinner } from '@atomikui/core';
import AppProvider from '../../providers/AppProvider';
import Header from '../Header';
import Editor from '../Editor';

const Layout = ({ children }) => {
  const { showEditor, isLoading } = useContext(AppProvider.Context);
  const { pathname } = useLocation();
  const isDashboard = pathname === '/dashboard';

  return (
    <>
      <Overlay isActive={isLoading}>
        <Spinner size="xlg" theme="white" themeVariant="light" />
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
            <div className="layout__content">{children}</div>
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
