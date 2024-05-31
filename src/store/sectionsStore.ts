import {create} from "zustand";

import {type SectionProps} from "../types";
import {sectionsData} from "../data";

interface SectionsStore {
  sections: SectionProps[];
  currentSection: SectionProps;
  setCurrentSection: (prevSection: SectionProps) => void;
  setSectionsData: (prevSections: SectionProps[]) => void;
  updateSection: (value: string) => void;
}

export const useSectionStore = create<SectionsStore>((set) => ({
  sections: sectionsData,
  currentSection: sectionsData[0],
  setSectionsData: (newSectionsData) => set(() => ({sections: newSectionsData})),
  setCurrentSection: (newCurrentSection) => set(() => ({currentSection: newCurrentSection})),
  updateSection: (value) =>
    set((state) => ({
      sections: state.sections.map((section) =>
        section.id === state.currentSection.id ? {...section, content: value} : section,
      ),
      currentSection: {...state.currentSection, content: value},
    })),
}));
