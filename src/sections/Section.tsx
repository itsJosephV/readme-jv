import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {useRef, useState} from "react";

import {type SectionProps} from "../types";
import {useSectionStore} from "../store";
import {DragIcon, ResetIcon} from "../icons";
import {TrashIcon} from "../icons";

export const Section = ({item}: {item: SectionProps}) => {
  const initialContentRef = useRef(item.content);

  const [isFocused, setIsFocused] = useState(false);
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: item.id});
  const {setCurrentSection, deleteSection, updateSection} = useSectionStore();

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  console.log(item.id);

  const handleResetButton = () => {
    if (initialContentRef.current) {
      updateSection(initialContentRef.current);
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <li
      ref={setNodeRef}
      className="flex w-full max-w-72 rounded-md bg-stone-800 p-2 transition-colors hover:bg-stone-600"
      role="button"
      style={style}
      tabIndex={0}
      onBlur={handleBlur}
      onClick={() => {
        setCurrentSection(item);
        console.log("clicked");
      }}
      onFocus={handleFocus}
    >
      <div className="flex flex-1 items-center gap-2">
        <DragIcon
          className="size-5 text-stone-500 transition-colors hover:text-stone-300"
          {...attributes}
          {...listeners}
        />
        <p className="">{item.title}</p>
      </div>
      {isFocused && (
        <div className="flex gap-2">
          <button
            className=""
            onClick={(e) => {
              e.stopPropagation();
              handleResetButton();
            }}
          >
            <ResetIcon />
          </button>
          <button
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
