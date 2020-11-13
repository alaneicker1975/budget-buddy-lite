import React, { useContext } from 'react';
import { Drawer } from '@atomikui/core';
import ExpenseGroups from '../../components/ExpenseGroups';
import Editor from '../../components/Editor';
import AppProvider from '../../providers/AppProvider';
import Header from '../../components/Header';

const Dashboard = () => {
  const { editorIsOpen } = useContext(AppProvider.Context);

  return (
    <div className="layout">
      <Header title="Budget Buddy Lite" />
      <div className="layout__body">
        <Drawer isOpen={editorIsOpen}>
          <Editor />
        </Drawer>
        <main className="layout__main">
          <div className="layout__content">
            <ExpenseGroups />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
