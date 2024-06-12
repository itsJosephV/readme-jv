import {SortableContext, verticalListSortingStrategy, arrayMove} from "@dnd-kit/sortable";
import {DndContext, DragEndEvent, closestCenter} from "@dnd-kit/core";
import {restrictToVerticalAxis} from "@dnd-kit/modifiers";
import {useRef, useState} from "react";

import {useSectionStore} from "../../store";
import {CurrentSectionView} from "../../types";
import useScrollPositions from "../../hooks/useScrollPositions";

import {MySection} from "./MySection";
import {OptionSection} from "./OptionSection";

interface SectionBoxProps {
  sectionView: CurrentSectionView;
  isSectionSelected: boolean;
  setIsSectionSelected: (isSectionSelected: boolean) => void;
}

export const SectionsContainer = ({
  sectionView,
  isSectionSelected,
  setIsSectionSelected,
}: SectionBoxProps) => {
  const sectionBoxRef = useRef<React.ElementRef<"div">>(null);

  const [focusedSection, setFocusedSection] = useState<string | null>(null);

  const {sections, setSectionsData, initialSections} = useSectionStore();

  useScrollPositions({sectionView, sectionBoxRef, isSectionSelected});

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
                isSectionSelected={isSectionSelected}
                item={item}
                setFocusedSection={setFocusedSection}
                setIsSectionSelected={setIsSectionSelected}
              />
            ))}
          </SortableContext>
        </ul>
      </DndContext>
    ),
    [CurrentSectionView.OPTIONS_SECTIONS]: (
      <ul className="space-y-3 p-3">
        {initialSections?.map((item) => (
          <OptionSection key={item.id} item={item} setIsSectionSelected={setIsSectionSelected} />
        ))}
      </ul>
    ),
  };

  return (
    <div
      ref={sectionBoxRef}
      className="h-full overflow-y-auto rounded-sm border border-stone-100/20"
    >
      <div>{currentSection[sectionView]}</div>
    </div>
  );
};
