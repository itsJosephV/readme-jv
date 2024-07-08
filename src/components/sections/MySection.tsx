import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {useLayoutEffect, useRef} from "react";
import {toast} from "sonner";

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
    sections,
    currentSection,
    initialSections,
    updateSection,
    setSectionsData,
    setCurrentSection,
  } = useSectionStore();

  const sectionHistory = useRef<string>(section.content);
  const onCurrentSection = section.id === currentSection.id;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleResetSection = () => {
    const initialSectionContent = initialSections.find(
      (sect) => sect.title === section.title,
    )?.content;

    const revertedSection = {
      ...section,
      content: initialSectionContent || "",
    };

    if (initialSectionContent) {
      sectionHistory.current = section.content;
      updateSection(revertedSection);
      setCurrentSection(revertedSection);
      toast(`[${section.title}] was resetted`, {
        action: <ActionButton />,
      });
    }
  };

  const handleDeleteSection = () => {
    //TODO: set current to an existing array, maybe?
    const newSections = sections.filter((sect) => sect.id !== section.id);

    setSectionsData(newSections);
    //TODO: handle a click to the first section?
    setCurrentSection({id: "", title: "", content: ""});
  };

  const handleSectionUndo = () => {
    const undoedSection = {
      ...section,
      content: sectionHistory.current,
    };

    updateSection(undoedSection);
    setCurrentSection(undoedSection);
    toast.dismiss();
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
         * scrollIntoView "smooth" option seems to be buggy across different broswers
         * when the component mounts on toggle
         */
        // node.scrollIntoView({behavior: "smooth", block: "nearest"});
      }

      const timeoutId = setTimeout(() => {
        setIsSectionSelected(false);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [currentSection.id, section.id, setIsSectionSelected]);

  const ActionButton = () => {
    return (
      <button className="ml-auto rounded-sm bg-red-300 p-0.5 px-1.5" onClick={handleSectionUndo}>
        Undo
      </button>
    );
  };

  return (
    <li
      ref={(node) => {
        setNodeRef(node);
        nodeRef.current = node;
      }}
      className={cn(
        "group flex w-full scroll-my-3 rounded-md border border-zinc-100/10 bg-zinc-800 py-2.5 pl-2 pr-2.5 transition-colors hover:bg-zinc-700 ",
        {
          "ring-2 ring-emerald-400/50": onCurrentSection,
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
          className={cn("size-6 text-zinc-500 transition-colors hover:text-zinc-200", {
            "text-emerald-400/50 hover:text-emerald-400": onCurrentSection,
          })}
          {...attributes}
          {...listeners}
        />
        <p
          className={cn("flex-1 truncate pr-1.5", {
            "text-emerald-400": onCurrentSection,
          })}
        >
          {section.title}
        </p>
      </div>
      {isFocused && (
        <div className="flex gap-2">
          <button
            className="cursor-pointer rounded-md bg-zinc-700 p-1 transition-colors group-hover:bg-zinc-600"
            onClick={(e) => {
              e.stopPropagation();
              handleResetSection();
            }}
          >
            <ResetIcon className="scale-x-[-1] text-emerald-400 hover:text-emerald-300" />
          </button>
          <button
            className="group cursor-pointer rounded-md bg-zinc-700 p-1 transition-colors group-hover:bg-zinc-600"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteSection();
            }}
          >
            <TrashIcon className="text-rose-400 transition-colors hover:text-rose-300" />
          </button>
        </div>
      )}
    </li>
  );
};
