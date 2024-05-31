import {create} from "zustand";

import {type SectionProps} from "../types";
import {sectionsData} from "../data";

interface SectionsStore {
  sections: SectionProps[];
  currentSection: SectionProps;
  setCurrentSection: (prevSection: SectionProps) => void;
  updateSection: (value: string) => void;
}

// function updateSection(value: string | undefined) {
//   if (value !== undefined) {
//     const updatedData: SectionProps[] = sectionsData.map((section) =>
//       section.id === currentSection.id ? {...section, content: value} : section,
//     );

//     setSectionsData(updatedData);
//   }
// }

export const useSectionStore = create<SectionsStore>((set) => ({
  sections: sectionsData,
  currentSection: sectionsData[0],
  setCurrentSection: (newCurrentSection) => set(() => ({currentSection: newCurrentSection})),
  updateSection: (value) =>
    set((state) => ({
      sections: state.sections.map((section) =>
        section.id === state.currentSection.id ? {...section, content: value} : section,
      ),
      currentSection: {...state.currentSection, content: value},
    })),
}));
