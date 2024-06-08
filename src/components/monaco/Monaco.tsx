/* eslint-disable react/jsx-sort-props */
import MonacoEditor from "@monaco-editor/react";
import {editor} from "monaco-editor";

import {useSectionStore} from "../../store";

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

const MonacoComponent = () => {
  const {currentSection, updateSection} = useSectionStore();

  return (
    <MonacoEditor
      className="h-full overflow-y-auto"
      options={options}
      theme="vs-dark"
      value={currentSection.content}
      onChange={(value: string | undefined) => updateSection(value || "")}
      defaultLanguage="markdown"
    />
  );
};

export {MonacoComponent};
