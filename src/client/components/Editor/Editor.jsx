/* eslint-disable no-shadow */
import React, { useContext, useState, useEffect } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { Button, Alert, Overlay, Spinner } from '@atomikui/core';
import { AppContext } from '../../AppProvider';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/yaml/yaml';

const Editor = () => {
  const { data, setShowEditor, saveUpdates } = useContext(AppContext);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const closeEditor = () => {
    setShowEditor(false);
    setError(null);
  };

  // useEffect(() => {
  //   if (isSaving) {
  //     saveUpdates(JSON.parse(json));
  //     setIsSaving(false);
  //   }
  // }, [isSaving]);

  return (
    <div className="editor">
      <Overlay style={{ position: 'absolute' }} isActive={isSaving}>
        <Spinner size="xlg" theme="cyan" />
      </Overlay>
      <div className="editor__hd">
        <span>Expense Editor</span>
        <Button
          size="sm"
          theme="gray"
          themeVariant="light"
          onClick={closeEditor}
        >
          Cancel
        </Button>
      </div>
      {error && <Alert theme={error.type}>{error.text}</Alert>}
      <CodeMirror
        value={JSON.stringify(data, null, 2)}
        options={{
          mode: 'yaml',
          theme: 'monokai',
          lineNumbers: false,
        }}
        onBeforeChange={(editor, data, value) => {
          // update document
        }}
      />
    </div>
  );
};

export default Editor;
