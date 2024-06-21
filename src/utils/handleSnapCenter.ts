type SnapCenterProps = {
  sizes: number[];
  SNAP_TRESHOLD: number;
  setSizes: (sizes: number[]) => void;
};

export const handleSnapCenter = ({sizes, SNAP_TRESHOLD, setSizes}: SnapCenterProps) => {
  const [leftPanel, rightPanel] = sizes;

  if (Math.abs(leftPanel - 50) <= SNAP_TRESHOLD && Math.abs(rightPanel - 50) <= SNAP_TRESHOLD) {
    setSizes([50, 50]);
  } else {
    setSizes(sizes);
  }
};
