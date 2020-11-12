/* eslint-disable no-shadow */
import React, { useContext } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import toYAML from 'json-to-pretty-yaml';
import toJSON from 'yamljs';
import DataProvider from '../../providers/DataProvider';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/yaml/yaml';

const Editor = () => {
  const { data, setData } = useContext(DataProvider.Context);
  return (
    <CodeMirror
      value={toYAML.stringify(data)}
      options={{
        mode: 'yaml',
        theme: 'monokai',
        lineNumbers: false,
      }}
      onBeforeChange={(editor, data, value) => {
        setData(toJSON.parse(value));
      }}
    />
  );
};

export default Editor;
