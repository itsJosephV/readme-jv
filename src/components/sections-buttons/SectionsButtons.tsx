import {sectionsData} from "@/data";
import {ResetIcon} from "@/icons";
import {startingSection, useSectionStore} from "@/store";
import {type SectionTabs} from "@/types";

type SectionsButtonsProps = {
  setSectionView: (switchToSection: SectionTabs) => void;
};

export const SectionsButtons = ({setSectionView}: SectionsButtonsProps) => {
  const {setSectionsData, setCurrentSection, setInitialSectionsAndCustoms} = useSectionStore();

  const handleReset = () => {
    setSectionsData([startingSection]);
    setCurrentSection(startingSection);
    setInitialSectionsAndCustoms(sectionsData);
  };

  return (
    <div className="flex gap-2 rounded-md border border-stone-100/20 p-3">
      <div className="flex flex-1 gap-2">
        <button
          className="w-full rounded-md bg-stone-700 p-1 transition-colors hover:bg-stone-600"
          onClick={() => setSectionView("selected-sections")}
        >
          My Sections
        </button>
        <button
          className="w-full rounded-md bg-stone-700 p-1 transition-colors hover:bg-stone-600"
          onClick={() => setSectionView("option-sections")}
        >
          Add New
        </button>
      </div>
      <button
        className="w-auto rounded-md bg-stone-700 p-1.5 transition-colors hover:bg-stone-600"
        onClick={handleReset}
      >
        <ResetIcon className="size-5 scale-x-[-1]" />
      </button>
    </div>
  );
};

export default SectionsButtons;
