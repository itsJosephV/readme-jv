/* eslint-disable react/jsx-sort-props */
import MonacoEditor from "@monaco-editor/react";
import {editor} from "monaco-editor";

//import {handleDrafts} from "../App";

interface MonacoProps {
  data: string | undefined;
  onChange: (value: string | undefined) => void;
}

const options: editor.IStandaloneEditorConstructionOptions = {
  readOnly: false,
  minimap: {enabled: false},
  wordWrap: "on",
  cursorStyle: "line-thin",
  lineNumbers: "off",
  fontSize: 14,
  scrollBeyondLastLine: false,
  automaticLayout: true,
};

const MonacoComponent = ({data, onChange}: MonacoProps) => {
  return (
    <MonacoEditor
      className="rounded-sm border border-stone-100/20"
      options={options}
      theme="vs-dark"
      value={data}
      onChange={onChange}
      defaultLanguage="markdown"
    />
  );
};

export {MonacoComponent};
