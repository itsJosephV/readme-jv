/* eslint-disable react/jsx-sort-props */
import MonacoEditor from "@monaco-editor/react";
import {editor} from "monaco-editor";

import {useSectionStore} from "../store";

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
  const {sections, currentSection, updateSection} = useSectionStore();

  return currentSection.content !== "" || sections.length > 0 ? (
    <MonacoEditor
      className="rounded-sm border border-stone-100/20"
      options={options}
      theme="vs-dark"
      value={currentSection.content}
      onChange={(value: string | undefined) => updateSection(value || "")}
      defaultLanguage="markdown"
    />
  ) : (
    "Select a section"
  );
};

export {MonacoComponent};
