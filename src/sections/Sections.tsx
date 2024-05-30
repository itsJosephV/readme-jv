import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {DndContext, closestCenter} from "@dnd-kit/core";

import {DraftItemsProps} from "../App";

import {Section} from "./Section";

interface SectionsProps {
  sectionsData: DraftItemsProps[];
  setCurrentDataIndex: (idx: number) => void;
}

const Sections = ({sectionsData, setCurrentDataIndex}: SectionsProps) => {
  return (
    <>
      <div className="flex justify-between gap-2">
        <button className="w-full rounded-md bg-stone-500 p-1">Your section</button>
        <button className="w-full rounded-md bg-stone-500 p-1">Sections</button>
      </div>

      <p className="py-2 text-xs">Click on a section below to edit the contents</p>
      <DndContext collisionDetection={closestCenter}>
        <ul className="flex flex-col gap-2 ">
          <SortableContext items={sectionsData} strategy={verticalListSortingStrategy}>
            {sectionsData?.map((item, idx) => {
              return (
                <Section
                  key={item.id}
                  idx={idx}
                  item={item}
                  setCurrentDataIndex={setCurrentDataIndex}
                />
              );
            })}
          </SortableContext>
        </ul>
      </DndContext>
    </>
  );
};

export default Sections;
