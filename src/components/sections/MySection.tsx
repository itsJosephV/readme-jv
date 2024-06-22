import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {useLayoutEffect, useRef} from "react";

import {type SectionProps} from "@/types";
import {cn} from "@/utils";
import {DragIcon, ResetIcon, TrashIcon} from "@/icons";
import {useSectionStore} from "@/store";

type MySectionsProps = {
  section: SectionProps;
  isFocused: boolean;
  isSectionSelected: boolean;
  setFocusedSection: (id: string | null) => void;
  setIsSectionSelected: (isSectionSelected: boolean) => void;
};

export const MySection = ({
  section,
  isFocused,
  setFocusedSection,
  setIsSectionSelected,
}: MySectionsProps) => {
  const nodeRef = useRef<React.ElementRef<"li"> | null>(null);
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: section.id});
  const {
    setCurrentSection,
    currentSection,
    initialSections,
    updateSection,
    setSectionsData,
    sections,
  } = useSectionStore();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleResetSection = () => {
    const initialSectionContent = initialSections.find(
      (sect) => sect.title === section.title,
    )?.content;

    if (initialSectionContent) {
      updateSection(initialSectionContent);
    }
  };

  const handleDeleteSection = () => {
    //TODO: set current to an existing array, maybe?
    const newSections = sections.filter((sect) => sect.id !== section.id);

    setSectionsData(newSections);
    //TODO: handle a click to the first section?
    setCurrentSection({id: "", title: "", content: ""});
  };

  const handleSectionClick = () => {
    //TODO: HANDLE REDUNDANT CALLS
    setFocusedSection(section.id);
    setCurrentSection(section);
  };

  //? EXPERIMENTAL SCROLL BEHAVIOUR
  useLayoutEffect(() => {
    if (currentSection.id === section.id) {
      const node = nodeRef.current;

      if (node) {
        node.focus({preventScroll: false});
        node.click();
        /**
         * scrollIntoView "smooth" option seems to be buggy in Safari
         * afer pushing the scroll top beyond its limit and getting back
         * to this component after toggling the section buttons will cause
         * a small scroll from top with a random value (Not happening in Firefox nor Chrome)
         * in Chrome the scrollIntoView wont reach the bottom sometimes afer
         * a section has been selected
         */
        // node.scrollIntoView({behavior: "smooth", block: "nearest"});
        // scrollIntoView(node, {behavior: "smooth", block: "nearest"});
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
        "flex w-full scroll-my-3 rounded-md border border-stone-700 bg-stone-800 py-2.5 pl-2 pr-2.5 transition-colors hover:bg-stone-700 focus:ring-2 focus:ring-emerald-300/50",
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
              handleResetSection();
            }}
          >
            <ResetIcon />
          </button>
          <button
            className="cursor-pointer rounded-md bg-stone-600 p-1 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteSection();
            }}
          >
            <TrashIcon />
          </button>
        </div>
      )}
    </li>
  );
};
