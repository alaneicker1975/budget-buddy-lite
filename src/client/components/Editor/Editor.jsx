/* eslint-disable no-shadow */
import React, { useContext, useState, useEffect } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { Button, List, ListItem } from '@atomikui/core';
import { AppContext } from '../../AppProvider';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/yaml/yaml';
import { SET_SHOW_EDITOR } from '../../reducers/appStateReducer';

const editorSettings = {
  mode: 'yaml',
  theme: 'monokai',
  lineNumbers: false,
};

const Editor = () => {
  const { updateExpenseGroup, state, dispatch } = useContext(AppContext);

  const { selectedExpense, showEditor } = state;

  const [json, setJson] = useState('');
  const [mode, setMode] = useState('update');
  const [id, setId] = useState(null);

  useEffect(() => {
    const { id, ...expense } = selectedExpense;
    setId(id);
    setMode(id ? 'Update' : 'New');
    setJson(JSON.stringify(expense, null, 2));
  }, [selectedExpense, showEditor]);

  return (
    <div className="editor">
      <div className="editor__hd">
        <span>{mode} Expense Group</span>
        <List type="horizontal">
          <ListItem>
            <Button
              size="sm"
              theme="gray"
              themeVariant="light"
              onClick={() =>
                dispatch({ type: SET_SHOW_EDITOR, payload: false })
              }
            >
              Cancel
            </Button>
          </ListItem>
          <ListItem>
            <Button
              size="sm"
              theme="cyan"
              onClick={() => updateExpenseGroup({ id, ...JSON.parse(json) })}
            >
              Save
            </Button>
          </ListItem>
        </List>
      </div>
      <CodeMirror
        value={json}
        options={editorSettings}
        onBeforeChange={(editor, data, value) => setJson(value)}
      />
    </div>
  );
};

export default Editor;
