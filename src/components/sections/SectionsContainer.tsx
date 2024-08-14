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
import {type SectionProps, SectionTabs} from "@/types";

type SectionBoxProps = {
  sectionView: SectionTabs;
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
    toast.success(toastMessage);
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

  const currentSection: Record<SectionTabs, JSX.Element> = {
    ["selected-sections"]: sections.length ? (
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
      <div className="flex h-full flex-col items-center justify-center gap-3 text-zinc-700">
        <UfoIcon className="size-28 " />
        <div className="text-center">
          <p>Your sections are gone!</p>
          <p>Start adding some {":)"}</p>
        </div>
      </div>
    ),
    ["option-sections"]: (
      <ul className="space-y-3 p-3">
        <li>
          <SearchInput query={query} setQuery={setQuery} />
        </li>
        <li>
          <Modal open={open} onOpenChange={setOpen}>
            <Modal.Trigger>
              <button className="w-full select-none rounded-md border border-zinc-100/10 bg-zinc-800 px-4 py-2.5 transition-colors hover:bg-zinc-700">
                Custom Section
              </button>
            </Modal.Trigger>
            <Modal.Content title="New Custom Section">
              <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit}>
                <label className="flex flex-col gap-1">
                  <span className="text-zinc-400">Section title</span>
                  <input
                    ref={inputRef}
                    autoFocus
                    className="rounded-md border border-zinc-100/10 bg-zinc-800 p-2.5 placeholder:text-zinc-500"
                    placeholder="e.g., Social links"
                    tabIndex={0}
                    type="text"
                  />
                </label>
                <button className="rounded-md border border-emerald-100/50 bg-emerald-700 py-2 font-medium tracking-wide text-emerald-100 transition-colors hover:bg-emerald-600">
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
            <div className="w-full rounded-md bg-zinc-800 px-4 py-3 text-center">
              <p className="text-zinc-500">No sections found</p>
            </div>
          </li>
        )}
      </ul>
    ),
  };

  return (
    <div ref={sectionBoxRef} className="h-full overflow-y-auto rounded-md bg-zinc-900">
      <div className="h-full">{currentSection[sectionView]}</div>
    </div>
  );
};
