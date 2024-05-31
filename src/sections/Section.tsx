import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {Dispatch, SetStateAction} from "react";

import {type SectionProps as SectionPropsT} from "../types";
import {DragIcon} from "../icons/DragIcon";

interface SectionProps {
  setCurrentSection: Dispatch<SetStateAction<SectionPropsT>>;
  item: SectionPropsT;
  idx: number;
}

export const Section = ({setCurrentSection, item, idx}: SectionProps) => {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: item.id});

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <li
      ref={setNodeRef}
      className="flex w-full max-w-72 rounded-md bg-stone-800 p-2 transition-colors hover:bg-stone-600"
      role="button"
      style={style}
      onClick={() => {
        console.log(idx);
        setCurrentSection(item);
      }}
    >
      <div className="flex flex-1 items-center gap-2">
        <DragIcon
          className="size-5 text-stone-500 transition-colors hover:text-stone-300"
          {...attributes}
          {...listeners}
        />
        <p className="">{item.title}</p>
      </div>
      <div className="flex gap-2">
        <button className="rounded-md bg-stone-500  px-2 py-0.5 text-sm">X</button>
        <button className="rounded-md bg-stone-500 px-2  py-0.5 text-sm">Y</button>
      </div>
    </li>
  );
};
