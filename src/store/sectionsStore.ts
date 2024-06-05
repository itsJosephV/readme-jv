import {create} from "zustand";
import {persist} from "zustand/middleware";

import {type SectionProps} from "../types";

interface SectionsStore {
  sections: SectionProps[];
  currentSection: SectionProps;
  setCurrentSection: (prevSection: SectionProps) => void;
  setSectionsData: (prevSections: SectionProps[]) => void;
  updateSection: (value: string) => void;
  deleteSection: (id: string) => void;
}

const mySections: SectionProps[] = [{id: "1", title: "H1", content: "# Title"}];

export const useSectionStore = create<SectionsStore>()(
  persist(
    (set) => ({
      sections: mySections,
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
    }),
    {name: "sections-store"},
  ),
);

// {"state":{"sections":[],"currentSection":{"id":"6e8daa32-9808-4e75-9d4e-2b0d33b05df8","title":"H3","content":"### Subheading"}},"version":0}
