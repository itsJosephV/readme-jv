/* eslint-disable react/jsx-sort-props */
import MonacoEditor from "@monaco-editor/react";
import {editor} from "monaco-editor";

import {useSectionStore} from "@/store";

export const SectionEditor = () => {
  const {currentSection, updateSection, sections} = useSectionStore();

  const isContentAvailable = currentSection.content !== "";
  const isSectionsNotEmpty = sections.length > 0;
  const getDefaultContent = () => "\n<- Add a section to start editing ";

  const options: editor.IStandaloneEditorConstructionOptions = {
    readOnly: !isContentAvailable || !isSectionsNotEmpty,
    minimap: {enabled: false},
    wordWrap: "on",
    cursorStyle: "line-thin",
    lineNumbers: "off",
    fontSize: 14,
    scrollBeyondLastLine: false,
    automaticLayout: true,
  };

  const value =
    isContentAvailable || isSectionsNotEmpty ? currentSection.content : getDefaultContent();

  return (
    <MonacoEditor
      className="h-full overflow-y-auto"
      options={options}
      theme="vs-dark"
      value={value}
      onChange={(value: string | undefined) => updateSection(value || "")}
      defaultLanguage="markdown"
    />
  );
};
