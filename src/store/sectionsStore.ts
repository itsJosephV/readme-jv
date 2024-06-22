import {create} from "zustand";
import {persist} from "zustand/middleware";

import {sectionsData} from "@/data";
import {type SectionProps, SectionStoreProps} from "@/types";

export const startingSection: SectionProps = {
  id: "22",
  title: "Project Title",
  content: `
# Project Title
A brief description for this project and who is it for 
`,
};

export const useSectionStore = create<SectionStoreProps>()(
  persist(
    (set) => ({
      sections: [startingSection],
      currentSection: startingSection,
      initialSections: sectionsData,
      setSectionsData: (newSectionsData) => set(() => ({sections: newSectionsData})),
      setCurrentSection: (newCurrentSection) => set(() => ({currentSection: newCurrentSection})),
      setInitialSectionsAndCustoms: (newInitialSections) =>
        set(() => ({initialSections: newInitialSections})),
      updateSection: (value) =>
        set((state) => ({
          sections: state.sections.map((section) =>
            section.id === state.currentSection.id ? {...section, content: value} : section,
          ),
          currentSection: {...state.currentSection, content: value},
        })),
    }),
    {name: "sections-store"},
  ),
);
