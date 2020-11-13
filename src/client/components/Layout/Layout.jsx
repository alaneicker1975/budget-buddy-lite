import React, { useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Overlay, Spinner } from '@atomikui/core';
import DataProvider from '../../providers/DataProvider';
import Dashboard from '../../pages/Dashboard';
import Login from '../../pages/Login';

const Layout = () => {
  const { isLoading } = useContext(DataProvider.Context);

  return (
    <Router>
      <Overlay isActive={isLoading}>
        <Spinner size="xlg" theme="white" themeVariant="light" />
      </Overlay>
      <Route path="/" component={Login} exact />
      <Route path="/dashboard" component={Dashboard} />
    </Router>
  );
};

export default Layout;
