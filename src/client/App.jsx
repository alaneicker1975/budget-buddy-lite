import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './routes/Dashboard';
import Login from './routes/Login';

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Layout>
  );
};

export default App;
