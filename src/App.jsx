import React from 'react';
import DataProvider from './providers/DataProvider';
import ExpenseGroups from './containers/ExpenseGroups';
import Editor from './containers/Editor';
import Header from './components/Header';

const App = () => {
  return (
    <DataProvider>
      <div className="layout">
        <div className="layout__content">
          <aside>
            <Header title="Budget Buddy Lite" />
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
