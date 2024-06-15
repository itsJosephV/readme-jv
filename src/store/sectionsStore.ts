import {create} from "zustand";
import {persist} from "zustand/middleware";

import {sectionsData} from "@/data";
import {type SectionProps} from "@/types";

interface SectionsStore {
  currentSection: SectionProps;
  sections: SectionProps[];
  initialSections: SectionProps[];
  setInitialSectionsAndCustoms: (prevInitials: SectionProps[]) => void;
  setCurrentSection: (prevSection: SectionProps) => void;
  setSectionsData: (prevSections: SectionProps[]) => void;
  updateSection: (value: string) => void;
  deleteSection: (id: string) => void;
  resetSection: (title: string, id: string) => void;
}

const mySections: SectionProps[] = [
  {
    id: "1",
    title: "Project Title",
    content: "# Project Title\nA brief description for this project and who is it for",
  },
];

export const useSectionStore = create<SectionsStore>()(
  persist(
    (set) => ({
      sections: mySections,
      currentSection: mySections[0],
      initialSections: sectionsData,
      setInitialSectionsAndCustoms: (newInitialSections) =>
        set(() => ({initialSections: newInitialSections})),
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
