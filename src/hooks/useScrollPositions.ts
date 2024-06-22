import {useLayoutEffect, useState} from "react";

import {type SectionTabs} from "@/types";

type USPProps = {
  sectionView: SectionTabs;
  sectionBoxRef: React.RefObject<HTMLDivElement>;
  isSectionSelected: boolean;
};

type ScrollPositions = {
  [key in SectionTabs]: number;
};

const useScrollPositions = ({sectionView, sectionBoxRef, isSectionSelected}: USPProps) => {
  const [scrollPositions, setScrollPositions] = useState<ScrollPositions>({
    "selected-sections": 0,
    "option-sections": 0,
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
