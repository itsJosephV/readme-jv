import {SectionProps} from "@/types";

export const handleMDFormart = (sectionsArr: SectionProps[] | undefined) => {
  return sectionsArr?.map((section) => section.content).join("\n\n");
};
