import React from 'react';
import ExpenseGroups from '../../components/ExpenseGroups';
import withRouteGuard from '../../withRouteGaurd';

const Dashboard = withRouteGuard(() => <ExpenseGroups />);

export default Dashboard;
