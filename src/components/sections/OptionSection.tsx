import {useMemo} from "react";
import {toast} from "sonner";

import {useSectionStore} from "@/store";
import {type SectionProps} from "@/types";
import {cn} from "@/utils";

type OptionSectionProps = {
  item: SectionProps;
  setIsSectionSelected: (sectionSelected: boolean) => void;
};

export const OptionSection = ({item, setIsSectionSelected}: OptionSectionProps) => {
  const {sections, setSectionsData, setCurrentSection} = useSectionStore();

  const handleAddSection = () => {
    const newSectionWithNewId = {
      ...item,
      id: crypto.randomUUID(),
    };

    const toastMessage = `New [${item.title}] Section Added`;

    setSectionsData([...sections, newSectionWithNewId]);
    setCurrentSection(newSectionWithNewId);
    setIsSectionSelected(true);
    toast.success(toastMessage);
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
      className={cn(
        "group flex w-full select-none items-center rounded-md border border-zinc-100/10 bg-zinc-800 py-2.5 pl-4 pr-3 transition-colors hover:bg-zinc-700",
        {
          "text-emerald-400": sectionAmount > 0,
        },
      )}
      role="button"
      onClick={handleAddSection}
    >
      <p className="flex-1">{item.title}</p>
      <div
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded-md bg-zinc-700 p-1 text-xs text-zinc-400 transition-colors group-hover:bg-zinc-600",
          {
            "text-emerald-400": sectionAmount > 0,
          },
        )}
      >
        {sectionAmount}
      </div>
    </li>
  );
};
