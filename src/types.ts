export interface SectionProps {
  id: string;
  title: string;
  content: string;
}

export enum CurrentSectionView {
  MY_SECTIONS = "MY-SECTIONS",
  OPTIONS_SECTIONS = "OPTIONS-SECTIONS",
}
