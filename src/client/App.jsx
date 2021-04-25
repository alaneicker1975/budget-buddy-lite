import React, { useEffect } from 'react';
import { BrowserRouter as Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './routes/Dashboard';
import Login from './routes/Login';
import useSetLoading from './hooks/useSetLoading';

const App = () => {
  const { setLoading } = useSetLoading();

  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.initiatorType === 'fetch') {
          setLoading(true);
        }
      }
    });

    observer.observe({
      entryTypes: ['resource'],
    });
  }, []);

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
