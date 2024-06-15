import {useLayoutEffect, useState} from "react";

import {CurrentSectionView} from "@/types";

interface USPProps {
  sectionView: CurrentSectionView;
  sectionBoxRef: React.RefObject<HTMLDivElement>;
  isSectionSelected: boolean;
}

type ScrollPositions = {
  [key in CurrentSectionView]: number;
};

const useScrollPositions = ({sectionView, sectionBoxRef, isSectionSelected}: USPProps) => {
  const [scrollPositions, setScrollPositions] = useState<ScrollPositions>({
    "MY-SECTIONS": 0,
    "OPTIONS-SECTIONS": 0,
  });

  useLayoutEffect(() => {
    const node = sectionBoxRef.current;

    if (!node) return;
    if (scrollPositions[sectionView] !== undefined && !isSectionSelected) {
      node.scrollTo(0, scrollPositions[sectionView]);
    }

    const handleScrollSave = () => {
      setScrollPositions((prevPositions) => ({
        ...prevPositions,
        [sectionView]: node.scrollTop,
      }));
    };

    node.addEventListener("scroll", handleScrollSave);

    return () => {
      node.removeEventListener("scroll", handleScrollSave);
    };
  }, [sectionBoxRef, scrollPositions, sectionView, isSectionSelected]);

  return scrollPositions;
};

export default useScrollPositions;
