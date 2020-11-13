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
import AppProvider from '../../providers/AppProvider';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/yaml/yaml';

const Editor = () => {
  const { data, setData, setEditorIsOpen, apiBaseUrl } = useContext(
    AppProvider.Context,
  );

  const [json, setJson] = useState(data);
  const [error, setError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const saveAndUpdate = () => {
    setIsSaving(true);

    fetch(`${apiBaseUrl}/expenses`, {
      method: 'post',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(json),
    })
      .then((res) => {
        return res.json();
      })
      .then(({ status }) => {
        if (status === 200) {
          setData(json);
          setEditorIsOpen(false);
          setIsSaving(false);
        } else {
          setError(true);
        }
      });
  };

  const closeEditor = () => {
    setJson(data);
    setEditorIsOpen(false);
  };

  useEffect(() => {
    setJson(data);
  }, [data]);

  return (
    <div className="editor">
      <Overlay style={{ position: 'absolute' }} isActive={isSaving}>
        <Spinner size="xlg" theme="white" themeVariant="light" />
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
            <Button size="sm" theme="blue" onClick={saveAndUpdate}>
              Save
            </Button>
          </ListItem>
        </List>
      </div>
      {error && <Alert theme="error">ERROR: Could not save changes</Alert>}
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
