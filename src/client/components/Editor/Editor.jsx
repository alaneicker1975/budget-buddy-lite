/* eslint-disable no-shadow */
import React, { useContext, useState, useEffect } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import toYAML from 'json-to-pretty-yaml';
import toJSON from 'yamljs';
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

  const [json, setJson] = useState(data);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const closeEditor = () => {
    setJson(data);
    setShowEditor(false);
    setError(null);
  };

  useEffect(() => {
    setJson(data);
  }, [data]);

  useEffect(() => {
    if (isSaving) {
      saveUpdates(json)
        .then(() => {
          setIsSaving(false);
        })
        .catch((err) => {
          setError({
            type: 'error',
            text: err,
          });
          setIsSaving(false);
        });
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
        value={toYAML.stringify(json)}
        options={{
          mode: 'yaml',
          theme: 'monokai',
          lineNumbers: false,
        }}
        onBeforeChange={(editor, data, value) => {
          setJson(toJSON.parse(value));
        }}
      />
    </div>
  );
};

export default Editor;
