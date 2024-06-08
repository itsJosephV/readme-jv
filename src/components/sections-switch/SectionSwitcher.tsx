import {CurrentSection} from "../../types";

const SectionSwitcher = ({
  setSetctionShift,
}: {
  setSetctionShift: (switchToSection: CurrentSection) => void;
}) => {
  return (
    <div className="flex justify-between gap-2 rounded-sm border border-stone-100/20 p-3">
      <button
        className="w-full rounded-sm bg-stone-500 p-1"
        onClick={() => setSetctionShift(CurrentSection.MY_SECTIONS)}
      >
        My Sections
      </button>
      <button
        className="w-full rounded-sm bg-stone-500 p-1"
        onClick={() => setSetctionShift(CurrentSection.OPTIONS_SECTIONS)}
      >
        Add New
      </button>
    </div>
  );
};

export default SectionSwitcher;
