interface Props {
  sizes: number[];
  snapThresHold: number;
  setSizes: (sizes: number[]) => void;
}

export const handleSnapCenter = ({sizes, snapThresHold, setSizes}: Props) => {
  const [leftPanel, rightPanel] = sizes;

  if (Math.abs(leftPanel - 50) <= snapThresHold && Math.abs(rightPanel - 50) <= snapThresHold) {
    setSizes([50, 50]);
  } else {
    setSizes(sizes);
  }
};
