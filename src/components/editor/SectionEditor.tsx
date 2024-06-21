/* eslint-disable react/jsx-sort-props */
import MonacoEditor from "@monaco-editor/react";
import {editor} from "monaco-editor";

import {useSectionStore} from "@/store";

export const SectionEditor = () => {
  const {currentSection, updateSection, sections} = useSectionStore();

  const isContentAvailable = currentSection.content !== "";
  const isSectionsNotEmpty = sections.length > 0;

  const options: editor.IStandaloneEditorConstructionOptions = {
    minimap: {enabled: false},
    wordWrap: "on",
    cursorStyle: "line-thin",
    lineNumbers: "off",
    fontSize: 14,
    scrollBeyondLastLine: false,
    automaticLayout: true,
  };

  const getDefaultContent = () => {
    if (!isSectionsNotEmpty) {
      return "\n👈 Add a section to start editing";
    }
    if (!isContentAvailable) {
      return "\n👈 Select a section to start editing ";
    }

    return currentSection.content;
  };

  return (
    <MonacoEditor
      className="h-full overflow-y-auto"
      options={options}
      theme="vs-dark"
      value={getDefaultContent()}
      onChange={(value: string | undefined) => updateSection(value || "")}
      defaultLanguage="markdown"
    />
  );
};
