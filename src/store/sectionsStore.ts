import {create} from "zustand";
import {persist} from "zustand/middleware";

import {type SectionProps} from "../types";
import {sectionsData} from "../data";

interface SectionsStore {
  initialSections: SectionProps[];
  sections: SectionProps[];
  currentSection: SectionProps;
  setCurrentSection: (prevSection: SectionProps) => void;
  setSectionsData: (prevSections: SectionProps[]) => void;
  updateSection: (value: string) => void;
  deleteSection: (id: string) => void;
  resetSection: (title: string, id: string) => void;
}

const mySections: SectionProps[] = [
  {
    id: "1",
    title: "H1",
    content: "# Project Title\n\nA brief description for this project and who is it for",
  },
];

export const useSectionStore = create<SectionsStore>()(
  persist(
    (set) => ({
      sections: mySections,
      initialSections: sectionsData,
      currentSection: mySections[0],
      setSectionsData: (newSectionsData) => set(() => ({sections: newSectionsData})),
      setCurrentSection: (newCurrentSection) => set(() => ({currentSection: newCurrentSection})),
      updateSection: (value) =>
        set((state) => ({
          sections: state.sections.map((section) =>
            section.id === state.currentSection.id ? {...section, content: value} : section,
          ),
          currentSection: {...state.currentSection, content: value},
        })),
      deleteSection: (id) =>
        set((prev) => ({
          sections: prev.sections.filter((section) => section.id !== id),
        })),
      resetSection: (title, id) =>
        set((state) => {
          const initialSectionContent = state.initialSections.find(
            (section) => section.title === title,
          )?.content;

          if (initialSectionContent) {
            return {
              sections: state.sections.map((section) =>
                section.id === id ? {...section, content: initialSectionContent} : section,
              ),
              currentSection:
                state.currentSection.id === id
                  ? {...state.currentSection, content: initialSectionContent}
                  : state.currentSection,
            };
          }

          return state;
        }),
    }),
    {name: "sections-store"},
  ),
);
