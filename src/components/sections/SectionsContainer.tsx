import {SortableContext, verticalListSortingStrategy, arrayMove} from "@dnd-kit/sortable";
import {DndContext, DragEndEvent, closestCenter} from "@dnd-kit/core";
import {restrictToVerticalAxis} from "@dnd-kit/modifiers";
import {FormEvent, useMemo, useRef, useState} from "react";
import {toast} from "sonner";

import Modal from "../modal/Modal";

import {OptionSection} from "./OptionSection";
import {SearchInput} from "./SearchInput";
import {MySection} from "./MySection";

import {useSectionStore} from "@/store";
import useDebounce from "@/hooks/useDebounce";
import useScrollPositions from "@/hooks/useScrollPositions";
import {UfoIcon} from "@/icons";
import {CurrentSectionView} from "@/enums";
import {SectionProps} from "@/types";

type SectionBoxProps = {
  sectionView: CurrentSectionView;
  isSectionSelected: boolean;
  setIsSectionSelected: (isSectionSelected: boolean) => void;
};

export const SectionsContainer = ({
  sectionView,
  isSectionSelected,
  setIsSectionSelected,
}: SectionBoxProps) => {
  const sectionBoxRef = useRef<React.ElementRef<"div">>(null);
  const inputRef = useRef<React.ElementRef<"input">>(null);

  const [focusedSection, setFocusedSection] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const [open, setOpen] = useState(false);
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

  const handleSubmit = (e: FormEvent) => {
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

    const toastMessage = `New [${inputValue}] Section Added`;

    setSectionsData([...sections, customSection]);
    setInitialSectionsAndCustoms([...initialSections, customSection]);
    setCurrentSection(customSection);
    setIsSectionSelected(true);
    toast(toastMessage, {
      className: "border border-emerald-700 bg-emerald-800 text-emerald-100",
      icon: "🚀",
    });
    setOpen(false);
  };

  const filteredSections = useMemo(() => {
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
        <UfoIcon className="size-28 " />
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
          <Modal open={open} onOpenChange={setOpen}>
            <Modal.Trigger>
              <button className="w-full select-none rounded-md border border-stone-700 bg-stone-800 px-4 py-2.5 transition-colors hover:bg-stone-700">
                Custom Section
              </button>
            </Modal.Trigger>
            <Modal.Content title="New Custom Section">
              <form className="mt-5 flex flex-col gap-4 text-stone-100" onSubmit={handleSubmit}>
                <input
                  ref={inputRef}
                  autoFocus
                  className="rounded-md bg-stone-800 p-2.5 placeholder:text-stone-400"
                  placeholder="Section Title"
                  tabIndex={0}
                  type="text"
                />
                <button className="rounded-md bg-emerald-700 py-2 tracking-wide text-emerald-100 transition-colors hover:bg-emerald-600">
                  Add New Section
                </button>
              </form>
            </Modal.Content>
          </Modal>
        </li>
        {filteredSections.length > 0 ? (
          filteredSections.map((section) => (
            <OptionSection
              key={section.id}
              item={section}
              setIsSectionSelected={setIsSectionSelected}
            />
          ))
        ) : (
          <li>
            <div className="w-full rounded-md  bg-stone-900 px-4 py-3 text-center text-stone-500 transition-colors">
              No sections found
            </div>
          </li>
        )}
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
