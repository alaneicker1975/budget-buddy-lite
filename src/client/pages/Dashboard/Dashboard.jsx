/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import ExpenseGroups from '../../components/ExpenseGroups';
import Layout from '../../components/Layout';
import { AppContext } from '../../AppProvider';

const Dashboard = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { apiBaseUrl, setGlobalMessage, setHistory } = useContext(AppContext);

  useEffect(() => {
    fetch(`${apiBaseUrl}/verify-user`)
      .then((res) => {
        return res.json();
      })
      .then(({ isValid }) => {
        if (!isValid) {
          props.history.push('/');
        }

        setIsLoggedIn(true);
      })
      .catch((err) => {
        setGlobalMessage({ theme: 'error', text: err.message });
      });
  }, []);

  useEffect(() => {
    setHistory(props.history);
  }, []);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Layout>
      <ExpenseGroups />
    </Layout>
  );
};

Dashboard.propTypes = {
  history: PropTypes.object,
};

Dashboard.defaultProps = {
  history: null,
};

export default Dashboard;
