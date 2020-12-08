/* eslint-disable no-shadow */
import React, { useContext, useState, useEffect } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { Button, List, ListItem } from '@atomikui/core';
import { AppContext } from '../../AppProvider';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/yaml/yaml';

const editorSettings = {
  mode: 'yaml',
  theme: 'monokai',
  lineNumbers: false,
};

const Editor = () => {
  const { setShowEditor, updateExpenseGroup, selectedExpense } = useContext(
    AppContext,
  );

  const [json, setJson] = useState('');
  const [id, setId] = useState(null);

  useEffect(() => {
    setId(selectedExpense.id);
    delete selectedExpense.id;
    setJson(JSON.stringify(selectedExpense, null, 2));
  }, [selectedExpense]);

  return (
    <div className="editor">
      <div className="editor__hd">
        <span>Expense Editor</span>
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
              theme="blue"
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
