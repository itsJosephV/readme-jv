import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

import {type SectionProps} from "../../types";
import {useSectionStore} from "../../store";
import {DragIcon, ResetIcon} from "../../icons";
import {TrashIcon} from "../../icons";

interface Props {
  item: SectionProps;
  isFocused: boolean;
  setFocusedSection: (id: string | null) => void;
}

export const Section = ({item, isFocused, setFocusedSection}: Props) => {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: item.id});
  const {setCurrentSection, deleteSection, resetSection} = useSectionStore();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  //console.log(item.id);

  const handleResetButton = () => {
    //TODO: ADD SOME VERIFICATION BEFORE RESETTING 👁️
    resetSection(item.title, item.id);
  };

  const handleSectionClick = () => {
    setFocusedSection(item.id);
    setCurrentSection(item);
  };

  return (
    <li
      ref={setNodeRef}
      className="flex w-full rounded-sm bg-stone-800 px-2 py-2.5 transition-colors hover:bg-stone-700"
      role="button"
      style={style}
      tabIndex={0}
      onClick={handleSectionClick}
    >
      <div className="flex flex-1 items-center gap-2">
        <DragIcon
          className="size-6 text-stone-500 transition-colors hover:text-stone-300"
          {...attributes}
          {...listeners}
        />
        <p className="">{item.title}</p>
      </div>
      {isFocused && (
        <div className="flex gap-2">
          <button
            className="cursor-pointer rounded-sm bg-stone-600 p-1 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleResetButton();
            }}
          >
            <ResetIcon />
          </button>
          <button
            className="cursor-pointer rounded-sm bg-stone-600 p-1 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              deleteSection(item.id);
              setCurrentSection({id: "", title: "", content: ""});
              //console.log("elem clicked");
            }}
          >
            <TrashIcon />
          </button>
        </div>
      )}
    </li>
  );
};
