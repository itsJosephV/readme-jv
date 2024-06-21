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
  updateSection: (value: string) => void;
};

type SectionStoreProps = {
  currentSection: SectionProps;
  sections: SectionProps[];
  initialSections: SectionProps[];
} & SectionStoreMethods;

export type {SectionStoreProps, SectionProps};
