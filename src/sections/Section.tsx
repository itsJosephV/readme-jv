/* eslint-disable react/jsx-sort-props */
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

interface SectionProps {
  setCurrentDataIndex: (index: number) => void;
  item: string;
  idx: number;
}

export const Section = ({setCurrentDataIndex, item, idx}: SectionProps) => {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: item});

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      role="button"
      style={style}
      onClick={() => setCurrentDataIndex(idx)}
      className="flex w-full max-w-72 rounded-md bg-stone-800 px-3 py-2  transition-colors hover:bg-stone-600"
    >
      <div className="flex flex-1 gap-2">
        <i className="border px-0.5">d</i>
        <p className="">{item.slice(0, 6)}</p>
      </div>
      <div className="flex gap-2">
        <button className="rounded-md bg-stone-500  px-2 py-0.5 text-sm">X</button>
        <button className="rounded-md bg-stone-500 px-2  py-0.5 text-sm">Y</button>
      </div>
    </li>
  );
};
