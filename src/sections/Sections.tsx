import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {DndContext, closestCenter} from "@dnd-kit/core";

import {Section} from "./Section";

interface SectionsProps {
  monacoData: string[];
  setCurrentDataIndex: (index: number) => void;
}

const Sections = ({monacoData, setCurrentDataIndex}: SectionsProps) => {
  return (
    <>
      <div className="flex justify-between gap-2">
        <button className="w-full rounded-md bg-stone-500 p-1">Your section</button>
        <button className="w-full rounded-md bg-stone-500 p-1">Sections</button>
      </div>

      <p className="py-2 text-xs">Click on a section below to edit the contents</p>
      <DndContext collisionDetection={closestCenter}>
        <ul className="flex flex-col gap-2 ">
          <SortableContext items={monacoData} strategy={verticalListSortingStrategy}>
            {monacoData?.map((item, idx) => {
              return (
                <Section
                  key={item}
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
