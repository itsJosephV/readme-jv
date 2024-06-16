import {create} from "zustand";

// import { persist } from "zustand/middleware";
import {sectionsData} from "@/data";
import {type SectionProps} from "@/types";

// Define the interface for the store
interface SectionsStore {
  currentSection: SectionProps;
  sections: SectionProps[];
  initialSections: SectionProps[];
  setInitialSectionsAndCustoms: (newInitialSections: SectionProps[]) => void;
  setCurrentSection: (newCurrentSection: SectionProps) => void;
  setSectionsData: (newSectionsData: SectionProps[]) => void;
  updateSection: (value: string) => void;
  deleteSection: (id: string) => void;
}

const mySections: SectionProps[] = [
  {
    id: "22",
    title: "Project Title",
    content: `
# Project Title
A brief description for this project and who is it for 
`,
  },
];

export const useSectionStore = create<SectionsStore>()(
  // persist(
  (set) => ({
    sections: mySections,
    currentSection: mySections[0],
    initialSections: sectionsData,
    setInitialSectionsAndCustoms: (newInitialSections) =>
      set(() => ({initialSections: newInitialSections})),
    setCurrentSection: (newCurrentSection) => set(() => ({currentSection: newCurrentSection})),
    setSectionsData: (newSectionsData) => set(() => ({sections: newSectionsData})),
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
  // ),
  // { name: "sections-store" }
);
