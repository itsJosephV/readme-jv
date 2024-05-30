import {DraftItemsProps} from "../App";

export const handleDrafts = (arr: DraftItemsProps[] | undefined) => {
  return arr ? arr.map((str) => `${str.content}\n`).join("") : undefined;
};
