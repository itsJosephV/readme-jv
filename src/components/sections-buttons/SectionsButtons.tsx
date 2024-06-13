import {ResetIcon} from "../../icons";
import {useSectionStore} from "../../store";
import {CurrentSectionView} from "../../types";

interface SectionsButtonsProps {
  setSectionView: (switchToSection: CurrentSectionView) => void;
}

const SectionsButtons = ({setSectionView}: SectionsButtonsProps) => {
  const resetValue = [{id: "1", title: "H1", content: "# Title"}];

  const {
    setSectionsData,
    setCurrentSection,
    //  sections
  } = useSectionStore();

  const handleReset = () => {
    setSectionsData(resetValue);
    setCurrentSection(resetValue[0]);
  };

  // console.log(sections);

  return (
    <div className="flex gap-2 rounded-md border border-stone-100/20 p-3">
      <div className="flex flex-1 gap-2">
        <button
          className="w-full rounded-md bg-stone-700 p-1 transition-colors hover:bg-stone-600"
          onClick={() => setSectionView(CurrentSectionView.MY_SECTIONS)}
        >
          My Sections
        </button>
        <button
          className="w-full rounded-md bg-stone-700 p-1 transition-colors hover:bg-stone-600"
          onClick={() => setSectionView(CurrentSectionView.OPTIONS_SECTIONS)}
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
