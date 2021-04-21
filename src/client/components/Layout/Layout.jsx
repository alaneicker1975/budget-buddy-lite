import React, { useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Drawer, Overlay, Spinner, Alert } from '@atomikui/core';
import { AppContext } from '../../AppProvider';
import Header from '../Header';
import Editor from '../Editor';
import appStateReducer, {
  appInitialState,
} from '../../reducers/appStateReducer';

const Layout = ({ children }) => {
  const [{ isLoggedIn }] = useReducer(appStateReducer, appInitialState);

  const { showEditor, isLoading, globalMessage } = useContext(AppContext);

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

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
