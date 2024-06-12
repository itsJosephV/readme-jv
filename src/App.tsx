import Split, {SplitProps} from "react-split";
import {useState} from "react";

import {createGutterElement, handleSnapCenter} from "./utils";
import {CurrentPreviewView, CurrentSectionView} from "./types";
import SectionsButtons from "./components/sections-buttons/SectionsButtons";
import {PreviewContainer} from "./components/preview";
import {SectionsContainer} from "./components/sections";
import {SectionEditor} from "./components/editor";

function App() {
  const [sizes, setSizes] = useState([50, 50]);
  const [sectionView, setSectionView] = useState<CurrentSectionView>(
    CurrentSectionView.MY_SECTIONS,
  );
  const [previewView, setPreviewView] = useState<CurrentPreviewView>(CurrentPreviewView.MD_PREVIEW);
  const [isSectionSelected, setIsSectionSelected] = useState<boolean>(false);

  const snapThresHold = 5;

  const dotSnapCss = `
  .split-panel {
    position: relative;
  }

  .split-snapping-dot::after {
    content: '';
    position: absolute;
    bottom: -12px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #404040;
    transform: translateX(-50%);
  }

  .split-snapping-dot::after {
    left: 50%;
  }`;

  const handleMDPreview = () => setPreviewView(CurrentPreviewView.MD_PREVIEW);
  const handleRawPreview = () => setPreviewView(CurrentPreviewView.MD_RAW);

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
    onDragEnd: (sizes) => handleSnapCenter({sizes, snapThresHold, setSizes}),
  };

  return (
    <>
      <article className="grid h-full max-h-screen grid-rows-[auto,1fr]">
        <header className="flex items-center p-5 capitalize">
          <div className="flex-1 text-xl font-semibold">
            <i>Readme-js</i>
          </div>
          <div className="flex gap-2">
            <button className="bg-stone-600 px-2" onClick={handleMDPreview}>
              Preview MD
            </button>
            <button className="bg-stone-600 px-2" onClick={handleRawPreview}>
              Raw MD
            </button>
            <button className="bg-stone-600 px-2">Download MD</button>
          </div>
          {/* <div className="flex items-center gap-2">
            <i>LinkOne</i>
            <i>LinkTwo</i>
          </div> */}
        </header>
        <main className="min-h flex gap-3 p-5 pt-0">
          <section className="flex w-full max-w-80 flex-col gap-3">
            {/* <div className="flex items-center rounded-sm bg-stone-800 p-2">
              <p className="flex-1 text-sm text-stone-400">Sections</p>
              <button className="rounded-sm bg-stone-600 px-2 text-sm text-stone-300">Reset</button>
            </div> */}
            <SectionsButtons setSectionView={setSectionView} />
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
      <style>{dotSnapCss}</style>
    </>
  );
}

export default App;
