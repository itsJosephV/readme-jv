import {SortableContext, verticalListSortingStrategy, arrayMove} from "@dnd-kit/sortable";
import {DndContext, DragEndEvent, closestCenter} from "@dnd-kit/core";
import {restrictToVerticalAxis} from "@dnd-kit/modifiers";
import {FormEvent, useRef, useState} from "react";

import {useSectionStore} from "../../store";
import {CurrentSectionView, SectionProps} from "../../types";
import useScrollPositions from "../../hooks/useScrollPositions";
import {Modal} from "../modal";

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

  const {
    sections,
    setSectionsData,
    initialSections,
    setCurrentSection,
    setInitialSectionsAndCustoms,
  } = useSectionStore();

  const inputRef = useRef<React.ElementRef<"input">>(null);

  useScrollPositions({sectionView, sectionBoxRef, isSectionSelected});

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;

    if (!over) return;
    const oldIndex = sections.findIndex((section) => section.id === active.id);
    const newIndex = sections.findIndex((section) => section.id === over?.id);

    const newOrder = arrayMove(sections, oldIndex, newIndex);

    setSectionsData(newOrder);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    //recover the value

    const inputValue = inputRef.current?.value;

    if (inputValue === "") return;

    // create custom section

    const customSection: SectionProps = {
      id: crypto.randomUUID(),
      title: inputValue as string,
      content: "# Custom section\n This is your custom section",
      custom: true,
    };

    setSectionsData([...sections, customSection]);
    setInitialSectionsAndCustoms([...initialSections, customSection]);
    setCurrentSection(customSection);
    setIsSectionSelected(true);
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
            {sections?.map((section) => (
              <MySection
                key={section.id}
                isFocused={focusedSection === section.id}
                isSectionSelected={isSectionSelected}
                section={section}
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
        <li>
          <Modal>
            <Modal.Button
              className="w-full select-none rounded-md bg-stone-800 px-3 py-2.5 transition-colors hover:bg-stone-600"
              onClick={() => console.log("create custom section")}
            >
              Custom Section
            </Modal.Button>
            <Modal.Content title="Custom section">
              <form className="mt-5 flex flex-col gap-4 text-stone-100" onSubmit={onSubmit}>
                <label className="flex flex-col gap-1">
                  Section Title
                  <input ref={inputRef} placeholder="section title" type="text" />
                </label>
                <button className="border">Create</button>
              </form>
            </Modal.Content>
          </Modal>
        </li>
        {initialSections
          .filter((section) => !section.custom)
          .map((sect) => (
            <OptionSection key={sect.id} item={sect} setIsSectionSelected={setIsSectionSelected} />
          ))}
      </ul>
    ),
  };

  return (
    <div
      ref={sectionBoxRef}
      className="h-full overflow-y-auto rounded-md border border-stone-100/20"
    >
      <div>{currentSection[sectionView]}</div>
    </div>
  );
};
