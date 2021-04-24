import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AppProvider } from './AppProvider';
import Layout from './components/Layout';
import Dashboard from './routes/Dashboard';
import Login from './routes/Login';

const App = () => {
  return (
    <AppProvider>
      <Layout>
        <Router>
          <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </Layout>
    </AppProvider>
  );
};

export default App;
