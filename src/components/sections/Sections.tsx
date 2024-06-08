import {SortableContext, verticalListSortingStrategy, arrayMove} from "@dnd-kit/sortable";
import {DndContext, DragEndEvent, closestCenter} from "@dnd-kit/core";
import {restrictToVerticalAxis} from "@dnd-kit/modifiers";
import {useState} from "react";

import {useSectionStore} from "../../store";
import {CurrentSectionView, SectionProps} from "../../types";

import {Section} from "./Section";

const Sections = ({sectionShift}: {sectionShift: CurrentSectionView}) => {
  const [focusedSection, setFocusedSection] = useState<string | null>(null);
  const {sections, setSectionsData, initialSections} = useSectionStore();

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
        <ul className="flex h-full flex-col gap-2">
          <SortableContext items={sections} strategy={verticalListSortingStrategy}>
            {sections?.map((item) => (
              <Section
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
      <ul className="flex h-full flex-col gap-2 overflow-y-auto">
        {initialSections?.map((item) => <OptionSection key={item.id} item={item} />)}
      </ul>
    ),
  };

  return (
    <div className="flex h-full flex-col gap-2 overflow-y-auto rounded-sm border border-stone-100/20 p-3">
      <div>{currentSection[sectionShift]}</div>
    </div>
  );
};

export default Sections;

const OptionSection = ({item}: {item: SectionProps}) => {
  const {sections, setSectionsData, setCurrentSection} = useSectionStore();

  const handleAddSectionAndCurrent = () => {
    const newSectionWithNewId = {
      ...item,
      id: crypto.randomUUID(),
    };

    setSectionsData([...sections, newSectionWithNewId]);
    setCurrentSection(newSectionWithNewId);
  };

  const findAmount = sections.reduce((acc, curr) => {
    if (curr.title === item.title) {
      acc++;
    }

    return acc;
  }, 0);

  return (
    <li
      className="flex w-full rounded-sm bg-stone-800 px-3 py-2.5 transition-colors hover:bg-stone-600"
      role="button"
      onClick={() => {
        handleAddSectionAndCurrent();
      }}
    >
      <p className="flex-1">{item.title}</p>
      <div className="flex gap-2">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-stone-600 text-xs">
          {findAmount}
        </div>
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-stone-600 font-serif text-xs font-semibold">
          i
        </div>
      </div>
    </li>
  );
};
