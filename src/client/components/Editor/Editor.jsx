/* eslint-disable no-shadow */
import React, { useContext, useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import toYAML from 'json-to-pretty-yaml';
import toJSON from 'yamljs';
import { Button, List, ListItem } from '@atomikui/core';
import DataProvider from '../../providers/DataProvider';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/yaml/yaml';

const Editor = () => {
  const { data, setEditorIsOpen, saveAndUpdate } = useContext(
    DataProvider.Context,
  );

  const [yaml, setYaml] = useState(data);

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
              onClick={() => {
                return setEditorIsOpen(false);
              }}
            >
              Cancel
            </Button>
          </ListItem>
          <ListItem>
            <Button
              size="sm"
              theme="blue"
              onClick={() => {
                return saveAndUpdate(yaml);
              }}
            >
              Save
            </Button>
          </ListItem>
        </List>
      </div>
      <CodeMirror
        value={toYAML.stringify(yaml)}
        options={{
          mode: 'yaml',
          theme: 'monokai',
          lineNumbers: false,
        }}
        onBeforeChange={(editor, data, value) => {
          setYaml(toJSON.parse(value));
        }}
      />
    </div>
  );
};

export default Editor;
