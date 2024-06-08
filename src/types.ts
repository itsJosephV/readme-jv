export interface SectionProps {
  id: string;
  title: string;
  content: string;
}

export enum CurrentSection {
  MY_SECTIONS = "MY-SECTIONS",
  OPTIONS_SECTIONS = "OPTIONS-SECTIONS",
}
