import {SortableContext, verticalListSortingStrategy, arrayMove} from "@dnd-kit/sortable";
import {DndContext, DragEndEvent, closestCenter} from "@dnd-kit/core";
import {restrictToVerticalAxis} from "@dnd-kit/modifiers";
import {Dispatch, SetStateAction} from "react";

import {DraftItemsProps} from "../App";

import {Section} from "./Section";

interface SectionsProps {
  sectionsData: DraftItemsProps[];
  setCurrentDataIndex: (idx: number) => void;
  setSectionsData: Dispatch<SetStateAction<DraftItemsProps[]>>;
}

const Sections = ({sectionsData, setCurrentDataIndex, setSectionsData}: SectionsProps) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;

    // console.log("active", active.id);
    // console.log("over", over.id);
    const oldIndex = sectionsData.findIndex((section) => section.id === active.id);
    const newIndex = sectionsData.findIndex((section) => section.id === over?.id);

    // console.log(oldIndex);
    // console.log(newIndex);
    const newOrder = arrayMove(sectionsData, oldIndex, newIndex);

    setSectionsData(newOrder);
  };

  return (
    <>
      <div className="flex justify-between gap-2">
        <button className="w-full rounded-md bg-stone-500 p-1">Your section</button>
        <button className="w-full rounded-md bg-stone-500 p-1">Sections</button>
      </div>

      <p className="py-2 text-xs">Click on a section below to edit the contents</p>
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
      >
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
