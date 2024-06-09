import {useLayoutEffect, useState} from "react";

import {CurrentSectionView} from "../types";

interface USPProps {
  sectionShift: CurrentSectionView;
  sectionWrapperRef: React.RefObject<HTMLDivElement>;
}

type ScrollPositions = {
  [key in CurrentSectionView]: number;
};

const useScrollPositions = ({sectionShift, sectionWrapperRef}: USPProps) => {
  const [scrollPositions, setScrollPositions] = useState<ScrollPositions>({
    "MY-SECTIONS": 0,
    "OPTIONS-SECTIONS": 0,
  });

  useLayoutEffect(() => {
    const node = sectionWrapperRef.current;

    if (!node) return;

    if (scrollPositions[sectionShift] !== undefined) {
      node.scrollTop = scrollPositions[sectionShift];
    }

    const handleScrollSave = () => {
      setScrollPositions((prevPositions) => ({
        ...prevPositions,
        [sectionShift]: node.scrollTop,
      }));
    };

    node.addEventListener("scroll", handleScrollSave);

    return () => {
      node.removeEventListener("scroll", handleScrollSave);
    };
  }, [sectionWrapperRef, scrollPositions, sectionShift]);

  return scrollPositions;
};

export default useScrollPositions;
