import React from 'react';
import ExpenseGroups from '../../components/ExpenseGroups';
import Layout from '../../components/Layout';

const Dashboard = () => {
  return (
    <Layout>
      <ExpenseGroups />
    </Layout>
  );
};

export default Dashboard;
