/* eslint-disable no-shadow */
import React, { useContext, useState, useEffect } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import {
  Button,
  List,
  ListItem,
  Alert,
  Overlay,
  Spinner,
} from '@atomikui/core';
import { AppContext } from '../../AppProvider';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/yaml/yaml';

const Editor = () => {
  const { data, setShowEditor, saveUpdates } = useContext(AppContext);
  const [json, setJson] = useState('');
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const closeEditor = () => {
    setJson(JSON.stringify(data, null, 2));
    setShowEditor(false);
    setError(null);
  };

  useEffect(() => {
    setJson(JSON.stringify(data, null, 2));
  }, [data]);

  useEffect(() => {
    if (isSaving) {
      saveUpdates(JSON.parse(json));
    }
  }, [isSaving]);

  return (
    <div className="editor">
      <Overlay style={{ position: 'absolute' }} isActive={isSaving}>
        <Spinner size="xlg" theme="cyan" />
      </Overlay>
      <div className="editor__hd">
        <span>Expense Editor</span>
        <List type="horizontal">
          <ListItem>
            <Button
              size="sm"
              theme="gray"
              themeVariant="light"
              onClick={closeEditor}
            >
              Cancel
            </Button>
          </ListItem>
          <ListItem>
            <Button
              size="sm"
              theme="blue"
              onClick={() => {
                return setIsSaving(true);
              }}
            >
              Save
            </Button>
          </ListItem>
        </List>
      </div>
      {error && <Alert theme={error.type}>{error.text}</Alert>}
      <CodeMirror
        value={json}
        options={{
          mode: 'yaml',
          theme: 'monokai',
          lineNumbers: false,
        }}
        onBeforeChange={(editor, data, value) => {
          setJson(value);
        }}
      />
    </div>
  );
};

export default Editor;
