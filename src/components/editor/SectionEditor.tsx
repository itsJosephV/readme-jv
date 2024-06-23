/* eslint-disable react/jsx-sort-props */
import MonacoEditor from "@monaco-editor/react";
import {editor} from "monaco-editor";

import {useSectionStore} from "@/store";

export const SectionEditor = () => {
  const {currentSection, updateSection, sections, setCurrentSection} = useSectionStore();

  const isSectionAvailable = sections.find((section) => section.id === currentSection.id);
  const isSectionsNotEmpty = sections.length > 0;

  const options: editor.IStandaloneEditorConstructionOptions = {
    minimap: {enabled: false},
    wordWrap: "on",
    cursorStyle: "line-thin",
    lineNumbers: "off",
    fontSize: 14,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    readOnly: !isSectionAvailable || !isSectionsNotEmpty,
    readOnlyMessage: {value: "Try editing a section"},
    fixedOverflowWidgets: true,
  };

  const getDefaultContent = () => {
    if (!isSectionsNotEmpty) {
      return `
👈 Add a new section to start editing
`;
    }
    if (!isSectionAvailable) {
      return `
👈 Select a new section to start editing
`;
    }

    return currentSection.content;
  };

  const handleSectionUpdate = (content: string) => {
    const updatedSectionX = {
      ...currentSection,
      content: content,
    };

    updateSection(updatedSectionX);
    setCurrentSection(updatedSectionX);
  };

  return (
    <MonacoEditor
      className="h-full overflow-y-auto"
      options={options}
      theme="vs-dark"
      value={currentSection.content === "" ? getDefaultContent() : currentSection.content}
      onChange={(value: string | undefined) => handleSectionUpdate(value || "")}
      defaultLanguage="markdown"
    />
  );
};
