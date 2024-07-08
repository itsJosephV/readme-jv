import {toast} from "sonner";

import {ToolTip} from "../tooltip";

import {sectionsData} from "@/data";
import {ResetIcon} from "@/icons";
import {startingSection, useSectionStore} from "@/store";
import {type SectionTabs} from "@/types";
import {cn} from "@/utils";

type SectionsButtonsProps = {
  setSectionView: (switchToSection: SectionTabs) => void;
  sectionView: SectionTabs;
};

export const SectionsButtons = ({setSectionView, sectionView}: SectionsButtonsProps) => {
  const {setSectionsData, setCurrentSection, setInitialSectionsAndCustoms} = useSectionStore();

  const handleReset = () => {
    const resetConfirm = confirm("All your sections will be removed, do you want to continue? ");

    if (resetConfirm) {
      setSectionsData([startingSection]);
      setCurrentSection(startingSection);
      setInitialSectionsAndCustoms(sectionsData);
      toast("Your sections were removed");
    }
  };

  const buttonStyle =
    "w-full rounded-md border border-zinc-100/10 bg-zinc-800 p-1 text-sm font-medium transition-colors hover:bg-zinc-700";

  return (
    <div className="flex gap-2 rounded-md bg-zinc-900 p-3">
      <div className="flex flex-1 gap-2">
        <button
          className={cn(buttonStyle, {
            "border-emerald-400/50 text-emerald-400": sectionView === "selected-sections",
          })}
          onClick={() => setSectionView("selected-sections")}
        >
          My Sections
        </button>
        <button
          className={cn(buttonStyle, {
            "border-emerald-400/50 text-emerald-400": sectionView === "option-sections",
          })}
          onClick={() => setSectionView("option-sections")}
        >
          Add New
        </button>
      </div>
      <ToolTip>
        <ToolTip.Trigger>
          <button
            className="w-auto rounded-md border border-zinc-100/10 bg-zinc-800 p-1.5 transition-colors hover:bg-zinc-700"
            onClick={handleReset}
          >
            <ResetIcon className="size-5 scale-x-[-1]" />
          </button>
        </ToolTip.Trigger>
        <ToolTip.Content>Reset the sections</ToolTip.Content>
      </ToolTip>
    </div>
  );
};

export default SectionsButtons;
