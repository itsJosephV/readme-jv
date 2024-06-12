import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {useLayoutEffect, useRef} from "react";

import {type SectionProps} from "../../types";
import {useSectionStore} from "../../store";
import {DragIcon, ResetIcon} from "../../icons";
import {TrashIcon} from "../../icons";
import {cn} from "../../utils";

interface Props {
  item: SectionProps;
  isFocused: boolean;
  setFocusedSection: (id: string | null) => void;
  isSectionSelected: boolean;
  setIsSectionSelected: (isSectionSelected: boolean) => void;
}

export const MySection = ({
  item,
  isFocused,
  setFocusedSection,
  isSectionSelected,
  setIsSectionSelected,
}: Props) => {
  const nodeRef = useRef<React.ElementRef<"li"> | null>(null);
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: item.id});
  const {setCurrentSection, currentSection, deleteSection, resetSection} = useSectionStore();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleResetButton = () => {
    //TODO: ADD SOME VERIFICATION BEFORE RESETTING 👁️
    resetSection(item.title, item.id);
  };

  const handleSectionClick = () => {
    //TODO: HANDLE REDUNDANT CALLS
    setFocusedSection(item.id);
    setCurrentSection(item);
  };

  useLayoutEffect(() => {
    if (isSectionSelected) {
      nodeRef.current?.scrollIntoView({behavior: "smooth", block: "center"});
      nodeRef.current?.click();

      const timeoutId = setTimeout(() => {
        setIsSectionSelected(false);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [isSectionSelected, setIsSectionSelected]);

  return (
    <li
      ref={(node) => {
        setNodeRef(node);
        nodeRef.current = node;
      }}
      className={cn(
        "flex w-full rounded-sm bg-stone-800 py-2.5 pl-2 pr-2.5 transition-colors hover:bg-stone-700",
        {
          "ring ring-violet-400/60 focus:ring-1": currentSection.id === item.id,
        },
      )}
      id={item.id}
      role="button"
      style={style}
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
            }}
          >
            <TrashIcon />
          </button>
        </div>
      )}
    </li>
  );
};
