/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import ExpenseGroups from '../../components/ExpenseGroups';
import Layout from '../../components/Layout';
import { AppContext } from '../../AppProvider';

const Dashboard = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const { setHistory, verifyToken } = useContext(AppContext);

  // useEffect(() => {
  //   setHistory(props.history);
  //   verifyToken()
  //     .then(() => {
  //       setIsLoggedIn(true);
  //     })
  //     .catch(() => {
  //       props.history.push('/');
  //     });
  // }, []);

  // if (!isLoggedIn) {
  //   return null;
  // }

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
