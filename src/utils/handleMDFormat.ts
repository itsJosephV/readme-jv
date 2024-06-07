import {type SectionProps} from "../types";

export const handleMDFormart = (arr: SectionProps[] | undefined) => {
  return arr?.map((section) => section.content).join("\n\n");
};
