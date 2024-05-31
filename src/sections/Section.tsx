import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

import {DraftItemsProps} from "../App";

interface SectionProps {
  setCurrentDataIndex: (idx: number) => void;
  item: DraftItemsProps;
  idx: number;
}

export const Section = ({setCurrentDataIndex, item, idx}: SectionProps) => {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: item.id});

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <li
      ref={setNodeRef}
      className="flex w-full max-w-72 rounded-md bg-stone-800 px-3 py-2  transition-colors hover:bg-stone-600"
      role="button"
      style={style}
      onClick={() => {
        console.log(idx);
        setCurrentDataIndex(idx);
      }}
    >
      <div className="flex flex-1 gap-2">
        <i {...attributes} {...listeners} className="border px-0.5">
          d
        </i>
        <p className="">{item.title}</p>
      </div>
      <div className="flex gap-2">
        <button className="rounded-md bg-stone-500  px-2 py-0.5 text-sm">X</button>
        <button className="rounded-md bg-stone-500 px-2  py-0.5 text-sm">Y</button>
      </div>
    </li>
  );
};
