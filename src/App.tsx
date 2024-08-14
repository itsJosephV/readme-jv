import type {PreviewTabs, SectionTabs} from "./types";

import Split, {SplitProps} from "react-split";
import {useState} from "react";

import {createGutterElement, handleSnapCenter} from "./utils";
import {SectionEditor} from "./components/editor";
import {PreviewContainer} from "./components/preview";
import {PreviewButtons} from "./components/preview-buttons";
import {SectionsContainer} from "./components/sections";
import {SectionsButtons} from "./components/sections-buttons";
import {SNAP_TRESHOLD, SPLIT_SIZES} from "./constants";

function App() {
  const [sizes, setSizes] = useState<number[]>(SPLIT_SIZES);
  const [sectionView, setSectionView] = useState<SectionTabs>("selected-sections");
  const [previewView, setPreviewView] = useState<PreviewTabs>("markdown-view");
  const [isSectionSelected, setIsSectionSelected] = useState<boolean>(false);

  const splitProps: SplitProps = {
    cursor: "col-resize",
    direction: "horizontal",
    expandToMin: true,
    gutter: (_, direction) => createGutterElement(direction),
    gutterAlign: "center",
    gutterSize: 12,
    minSize: 100,
    sizes: sizes,
    onDrag: (sizes) => setSizes(sizes),
    onDragEnd: (sizes) => handleSnapCenter({sizes, SNAP_TRESHOLD, setSizes}),
  };

  return (
    <>
      <article className="grid h-full max-h-screen grid-rows-[auto,1fr]">
        <header className="flex items-center px-5 py-3.5 capitalize">
          <div className="flex-1 text-xl font-semibold">
            <h1>Readme.jv</h1>
          </div>
          <PreviewButtons previewView={previewView} setPreviewView={setPreviewView} />
        </header>
        <main className="min-h flex gap-3 p-5 pt-0">
          <section className="flex w-full max-w-80 flex-col gap-3">
            <SectionsButtons sectionView={sectionView} setSectionView={setSectionView} />
            <SectionsContainer
              isSectionSelected={isSectionSelected}
              sectionView={sectionView}
              setIsSectionSelected={setIsSectionSelected}
            />
          </section>
          <section className="split-panel w-full">
            <Split {...splitProps} className="flex h-full border border-stone-100/20">
              <SectionEditor />
              <PreviewContainer previewView={previewView} />
            </Split>
            <div className="split-snapping-dot" />
          </section>
        </main>
      </article>
    </>
  );
}

export default App;
