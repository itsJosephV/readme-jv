import {SortableContext, verticalListSortingStrategy, arrayMove} from "@dnd-kit/sortable";
import {DndContext, DragEndEvent, closestCenter} from "@dnd-kit/core";
import {restrictToVerticalAxis} from "@dnd-kit/modifiers";
import {useState} from "react";

import {useSectionStore} from "../../store";
import {CurrentSection, SectionProps} from "../../types";

import {Section} from "./Section";

const Sections = ({sectionShift}: {sectionShift: CurrentSection}) => {
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

  const currentSection: Record<CurrentSection, JSX.Element> = {
    [CurrentSection.MY_SECTIONS]: (
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
    [CurrentSection.OPTIONS_SECTIONS]: (
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

  const handleAddSection = () => {
    const newSectionWithNewId = {
      ...item,
      id: crypto.randomUUID(),
    };

    setSectionsData([...sections, newSectionWithNewId]);
    //console.log(sections);
  };

  return (
    <li
      className="flex w-full rounded-sm bg-stone-800 px-2 py-2.5 transition-colors hover:bg-stone-600"
      role="button"
      onClick={() => {
        handleAddSection();
        setCurrentSection(item);
      }}
    >
      <p className="">{item.title}</p>
    </li>
  );
};
