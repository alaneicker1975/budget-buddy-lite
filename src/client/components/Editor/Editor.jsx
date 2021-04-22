/* eslint-disable no-shadow */
import React, { useContext, useState, useEffect } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { Button, List, ListItem } from '@atomikui/core';
import { AppContext } from '../../AppProvider';
import useShowEditor from '../../hooks/useShowEditor';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/yaml/yaml';

const editorSettings = {
  mode: 'yaml',
  theme: 'monokai',
  lineNumbers: false,
};

const Editor = () => {
  const { updateExpenseGroup, state } = useContext(AppContext);
  const { setShowEditor } = useShowEditor();

  const { selectedExpense } = state;

  const [json, setJson] = useState('');
  const [mode, setMode] = useState('update');
  const [id, setId] = useState(null);

  useEffect(() => {
    const { _id, ...expense } = selectedExpense;
    setId(_id);
    setMode(_id ? 'Update' : 'New');
    setJson(JSON.stringify(expense, null, 2));
  }, [selectedExpense]);

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
              onClick={() => setShowEditor(false)}
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
