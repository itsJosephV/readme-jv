import {type SectionProps} from "../types";

export const handleMDFormart = (arr: SectionProps[] | undefined) => {
  return arr ? arr.map((str) => `${str.content}\n\n`).join("") : undefined;
};
