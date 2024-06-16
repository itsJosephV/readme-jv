import {SortableContext, verticalListSortingStrategy, arrayMove} from "@dnd-kit/sortable";
import {DndContext, DragEndEvent, closestCenter} from "@dnd-kit/core";
import {restrictToVerticalAxis} from "@dnd-kit/modifiers";
import {FormEvent, useMemo, useRef, useState} from "react";

import {Modal} from "../modal";

import {OptionSection} from "./OptionSection";
import {SearchInput} from "./SearchInput";
import {MySection} from "./MySection";

import useScrollPositions from "@/hooks/useScrollPositions";
import {CurrentSectionView, SectionProps} from "@/types";
import {useSectionStore} from "@/store";
import {BlackHoleIcon} from "@/icons/BlackHoleIcon";
import useDebounce from "@/hooks/useDebounce";

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
  const inputRef = useRef<React.ElementRef<"input">>(null);

  const [focusedSection, setFocusedSection] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const debounceSearch = useDebounce(query);

  const {
    sections,
    initialSections,
    setSectionsData,
    setCurrentSection,
    setInitialSectionsAndCustoms,
  } = useSectionStore();

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

    const inputValue = inputRef.current?.value;

    if (inputValue === "") return;

    const customSection: SectionProps = {
      id: crypto.randomUUID(),
      title: inputValue as string,
      content: `
## ${inputValue}
This is your custom section
`,
      custom: true,
    };

    setSectionsData([...sections, customSection]);
    setInitialSectionsAndCustoms([...initialSections, customSection]);
    setCurrentSection(customSection);
    setIsSectionSelected(true);
  };

  const filteredSections = useMemo(() => {
    console.log("running");

    return initialSections
      .filter((section) => !section.custom)
      .filter((section) => section.title.toLowerCase().includes(debounceSearch.toLowerCase()))
      .sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;

        return 0;
      });
  }, [initialSections, debounceSearch]);

  const currentSection: Record<CurrentSectionView, JSX.Element> = {
    [CurrentSectionView.MY_SECTIONS]: sections.length ? (
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
    ) : (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-stone-700">
        <BlackHoleIcon className="size-28 " />
        <div className="text-center">
          <p>Your sections are gone!</p>
          <p>Start adding some {":)"}</p>
        </div>
      </div>
    ),
    [CurrentSectionView.OPTIONS_SECTIONS]: (
      <ul className="space-y-3 p-3">
        <li>
          <SearchInput query={query} setQuery={setQuery} />
        </li>
        <li>
          <Modal>
            <Modal.Button className="w-full select-none rounded-md border border-stone-700 bg-stone-800 px-4 py-2.5 transition-colors hover:bg-stone-700">
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
        {filteredSections.map((section) => (
          <OptionSection
            key={section.id}
            item={section}
            setIsSectionSelected={setIsSectionSelected}
          />
        ))}
      </ul>
    ),
  };

  return (
    <div
      ref={sectionBoxRef}
      className="h-full overflow-y-auto rounded-md border border-stone-100/20"
    >
      <div className="h-full">{currentSection[sectionView]}</div>
    </div>
  );
};

// https://api.dictionaryapi.dev/api/v2/entries/en/perfect
