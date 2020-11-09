import React from 'react';
import DataProvider from './providers/DataProvider';
import ExpenseGroups from './containers/ExpenseGroups';

const App = () => {
  return (
    <DataProvider>
      <ExpenseGroups />
    </DataProvider>
  );
};

export default App;
