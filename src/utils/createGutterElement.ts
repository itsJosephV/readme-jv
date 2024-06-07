export const createGutterElement = (direction: string) => {
  const gutterElement = document.createElement("div");

  gutterElement.className = `gutter gutter-${direction}`;

  return gutterElement;
};
