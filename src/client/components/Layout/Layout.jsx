import React, { useContext } from 'react';
import { Drawer } from '@atomikui/core';
import ExpenseGroups from '../ExpenseGroups';
import Editor from '../Editor';
import Header from '../Header';
import DataProvider from '../../providers/DataProvider';

const Layout = () => {
  const { editorIsOpen } = useContext(DataProvider.Context);

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

export default Layout;
