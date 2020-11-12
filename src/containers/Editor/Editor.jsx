import React, { useContext, useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import YAML from 'json-to-pretty-yaml';
import DataProvider from '../../providers/DataProvider';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/yaml/yaml';

const Editor = () => {
  const data = useContext(DataProvider.Context);
  const [yaml, setYaml] = useState(YAML.stringify(data));

  return (
    <CodeMirror
      value={yaml}
      options={{
        mode: 'yaml',
        theme: 'monokai',
        lineNumbers: false,
      }}
      onBeforeChange={(editor, data, value) => {
        setYaml(value);
      }}
    />
  );
};

export default Editor;
