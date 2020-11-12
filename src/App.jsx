import React from 'react';
import DataProvider from './providers/DataProvider';
import ExpenseGroups from './containers/ExpenseGroups';
import Editor from './containers/Editor';
import Header from './components/Header';

const App = () => {
  return (
    <DataProvider>
      <div className="layout">
        <Header title="Budget Buddy Lite" />
        <div className="layout__content">
          <aside>
            <Editor />
          </aside>
          <main>
            <ExpenseGroups />
          </main>
        </div>
      </div>
    </DataProvider>
  );
};

export default App;
