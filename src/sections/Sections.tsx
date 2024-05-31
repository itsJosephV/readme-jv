import {SortableContext, verticalListSortingStrategy, arrayMove} from "@dnd-kit/sortable";
import {DndContext, DragEndEvent, closestCenter} from "@dnd-kit/core";
import {restrictToVerticalAxis} from "@dnd-kit/modifiers";

import {useSectionStore} from "../store";

import {Section} from "./Section";

const Sections = () => {
  const {sections, setSectionsData} = useSectionStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;

    const oldIndex = sections.findIndex((section) => section.id === active.id);
    const newIndex = sections.findIndex((section) => section.id === over?.id);

    const newOrder = arrayMove(sections, oldIndex, newIndex);

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
          <SortableContext items={sections} strategy={verticalListSortingStrategy}>
            {sections?.map((item, idx) => {
              return <Section key={item.id} idx={idx} item={item} />;
            })}
          </SortableContext>
        </ul>
      </DndContext>
    </>
  );
};

export default Sections;
