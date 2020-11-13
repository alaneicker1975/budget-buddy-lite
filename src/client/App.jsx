import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppProvider from './providers/AppProvider';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Route path="/" component={Login} exact />
        <Route path="/dashboard" component={Dashboard} />
      </Router>
    </AppProvider>
  );
};

export default App;
