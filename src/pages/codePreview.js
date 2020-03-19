import React from 'react';
import MonacoEditor from 'react-monaco-editor';

function codePreview() {
    const options = {
      selectOnLineNumbers: true
    };
    return (
    <div>
      <MonacoEditor
        width="800"
        height="600"
        language="javascript"
        theme="vs-dark"
        value={null}
        options={options}
        // onChange={::this.onChange}
        // editorDidMount={::this.editorDidMount}
      />

        </div>
    )
}

export default codePreview;