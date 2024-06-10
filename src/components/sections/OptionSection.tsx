import {useSectionStore} from "../../store";
import {SectionProps} from "../../types";

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

  const findAmount = sections.reduce((acc, curr) => {
    if (curr.title === item.title) {
      acc++;
    }

    return acc;
  }, 0);

  return (
    <li
      className="flex w-full select-none rounded-sm bg-stone-800 px-3 py-2.5 transition-colors hover:bg-stone-600"
      role="button"
      onClick={() => {
        handleAddSectionAndCurrent();
        setIsSectionSelected(true);
      }}
    >
      <p className="flex-1">{item.title}</p>
      <div className="flex gap-2">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-stone-600 text-xs">
          {findAmount}
        </div>
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-stone-600 font-serif text-xs font-semibold">
          i
        </div>
      </div>
    </li>
  );
};
