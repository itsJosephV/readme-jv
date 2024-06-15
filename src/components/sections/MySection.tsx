import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {useLayoutEffect, useRef} from "react";

import {type SectionProps} from "@/types";
import {cn} from "@/utils";
import {DragIcon, ResetIcon, TrashIcon} from "@/icons";
import {useSectionStore} from "@/store";

interface Props {
  section: SectionProps;
  isFocused: boolean;
  setFocusedSection: (id: string | null) => void;
  isSectionSelected: boolean;
  setIsSectionSelected: (isSectionSelected: boolean) => void;
}

export const MySection = ({section, isFocused, setFocusedSection, setIsSectionSelected}: Props) => {
  const nodeRef = useRef<React.ElementRef<"li"> | null>(null);
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: section.id});
  const {setCurrentSection, currentSection, deleteSection, resetSection} = useSectionStore();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleResetButton = () => {
    //TODO: ADD SOME VERIFICATION BEFORE RESETTING 👁️
    resetSection(section.title, section.id);
  };

  const handleSectionClick = () => {
    //TODO: HANDLE REDUNDANT CALLS
    setFocusedSection(section.id);
    setCurrentSection(section);
  };

  useLayoutEffect(() => {
    if (currentSection.id === section.id) {
      const node = nodeRef.current;

      if (node) {
        node.scrollIntoView({behavior: "smooth", block: "nearest"});
        node.focus({preventScroll: true});
        node.click();
      }

      const timeoutId = setTimeout(() => {
        setIsSectionSelected(false);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [currentSection.id, section.id, setIsSectionSelected]);

  return (
    <li
      ref={(node) => {
        setNodeRef(node);
        nodeRef.current = node;
      }}
      className={cn(
        "flex w-full scroll-my-3 rounded-md bg-stone-800 py-2.5 pl-2 pr-2.5 transition-colors hover:bg-stone-700 focus:ring-2 focus:ring-emerald-300/50",
        {
          "bg-emerald-300/20": currentSection.id === section.id,
        },
      )}
      id={section.id}
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
        <p className="flex-1 truncate pr-1.5">{section.title}</p>
      </div>
      {isFocused && (
        <div className="flex gap-2">
          <button
            className="cursor-pointer rounded-md bg-stone-600 p-1 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleResetButton();
            }}
          >
            <ResetIcon />
          </button>
          <button
            className="cursor-pointer rounded-md bg-stone-600 p-1 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              deleteSection(section.id);
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
