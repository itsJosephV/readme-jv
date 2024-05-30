export const handleDrafts = (arr: string[] | undefined) => {
  return arr ? arr.map((str) => `${str}\n`).join("") : undefined;
};
