type SectionProps = {
  id: string;
  title: string;
  content: string;
  custom?: boolean;
};

type SectionStoreMethods = {
  setSectionsData: (newSectionsData: SectionProps[]) => void;
  setCurrentSection: (newCurrentSection: SectionProps) => void;
  setInitialSectionsAndCustoms: (newInitialSections: SectionProps[]) => void;
  updateSection: (updatedSection: SectionProps) => void;
};

type SectionStoreProps = {
  currentSection: SectionProps;
  sections: SectionProps[];
  initialSections: SectionProps[];
} & SectionStoreMethods;

type SectionTabs = "selected-sections" | "option-sections";
type PreviewTabs = "markdown-view" | "raw-view";

export type {SectionStoreProps, SectionProps, SectionTabs, PreviewTabs};
