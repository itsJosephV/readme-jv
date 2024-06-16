import {useMemo} from "react";

import {useSectionStore} from "@/store";
import {type SectionProps} from "@/types";

export const OptionSection = ({
  item,
  setIsSectionSelected,
}: {
  item: SectionProps;
  setIsSectionSelected: (sectionSelected: boolean) => void;
}) => {
  const {sections, setSectionsData, setCurrentSection} = useSectionStore();

  const handleAddSectionAndCurrent = () => {
    const newSectionWithNewId = {
      ...item,
      id: crypto.randomUUID(),
    };

    setSectionsData([...sections, newSectionWithNewId]);
    setCurrentSection(newSectionWithNewId);
  };

  const sectionAmount = useMemo(() => {
    return sections.reduce((acc, curr) => {
      if (curr.title === item.title) {
        acc++;
      }

      return acc;
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections.length, item.title]);

  return (
    <li
      className="flex w-full select-none items-center rounded-md border border-stone-700 bg-stone-800 py-2.5 pl-4 pr-3 transition-colors hover:bg-stone-700"
      role="button"
      onClick={() => {
        handleAddSectionAndCurrent();
        setIsSectionSelected(true);
      }}
    >
      <p className="flex-1">{item.title}</p>
      <div className="flex gap-2">
        <div className="flex h-5 w-5 items-center justify-center rounded-md bg-stone-600 text-xs">
          {sectionAmount}
        </div>
        <div className="flex h-5 w-5 items-center justify-center rounded-md bg-stone-600 font-serif text-xs font-semibold">
          i
        </div>
      </div>
    </li>
  );
};
