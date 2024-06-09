import {SortableContext, verticalListSortingStrategy, arrayMove} from "@dnd-kit/sortable";
import {DndContext, DragEndEvent, closestCenter} from "@dnd-kit/core";
import {restrictToVerticalAxis} from "@dnd-kit/modifiers";
import {useRef, useState} from "react";

import {useSectionStore} from "../../store";
import {CurrentSectionView} from "../../types";
import useScrollPositions from "../../hooks/useScrollPositions";

import {MySection} from "./MySection";
import {OptionSection} from "./OptionSection";

const SectionsBox = ({sectionShift}: {sectionShift: CurrentSectionView}) => {
  const sectionWrapperRef = useRef<React.ElementRef<"div">>(null);

  const [focusedSection, setFocusedSection] = useState<string | null>(null);

  const {sections, setSectionsData, initialSections} = useSectionStore();

  const scrollPositions = useScrollPositions({sectionShift, sectionWrapperRef});

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;

    if (!over) return;
    const oldIndex = sections.findIndex((section) => section.id === active.id);
    const newIndex = sections.findIndex((section) => section.id === over?.id);

    const newOrder = arrayMove(sections, oldIndex, newIndex);

    setSectionsData(newOrder);
  };

  const currentSection: Record<CurrentSectionView, JSX.Element> = {
    [CurrentSectionView.MY_SECTIONS]: (
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
      >
        <ul className="space-y-3 p-3">
          <SortableContext items={sections} strategy={verticalListSortingStrategy}>
            {sections?.map((item) => (
              <MySection
                key={item.id}
                isFocused={focusedSection === item.id}
                item={item}
                setFocusedSection={setFocusedSection}
              />
            ))}
          </SortableContext>
        </ul>
      </DndContext>
    ),
    [CurrentSectionView.OPTIONS_SECTIONS]: (
      <ul className="space-y-3 p-3">
        {initialSections?.map((item) => <OptionSection key={item.id} item={item} />)}
      </ul>
    ),
  };

  console.log(scrollPositions);

  return (
    <div
      ref={sectionWrapperRef}
      className="h-full overflow-y-auto rounded-sm border border-stone-100/20"
    >
      <div>{currentSection[sectionShift]}</div>
    </div>
  );
};

export default SectionsBox;
