/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import ExpenseGroups from '../../components/ExpenseGroups';
import Layout from '../../components/Layout';
import { AppContext } from '../../AppProvider';

const Dashboard = (props) => {
  const { apiBaseUrl, setGlobalMessage } = useContext(AppContext);

  useEffect(() => {
    fetch(`${apiBaseUrl}/verify-user`)
      .then((res) => {
        return res.json();
      })
      .then(({ isValid }) => {
        if (!isValid) {
          props.history.push('/');
        }
      })
      .catch((err) => {
        setGlobalMessage({ theme: 'error', text: err.message });
      });
  }, []);

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
