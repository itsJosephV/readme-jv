import Split, {SplitProps} from "react-split";
import {useState} from "react";

import {MarkdownComponent as Markdown} from "./components/markdown";
import {MonacoComponent as Monaco} from "./components/monaco";
import {createGutterElement, handleSnapCenter} from "./utils";
import {CurrentSectionView} from "./types";
import SectionsButtons from "./components/sections-buttons/SectionsButtons";
import SectionsBox from "./components/sections/SectionsBox";

function App() {
  const [sizes, setSizes] = useState([50, 50]);
  const [sectionShift, setSetctionShift] = useState<CurrentSectionView>(
    CurrentSectionView.MY_SECTIONS,
  );
  const snapThresHold = 5;

  const dotSnapCss = `
  .split-panel-snapping {
    position: relative;
  }

  .split-panel-snapping-dots::after {
    content: '';
    position: absolute;
    bottom: -12px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #404040;
    transform: translateX(-50%);
  }

  .split-panel-snapping-dots::after {
    left: 50%;
  }`;

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
      <main className="grid h-full max-h-screen grid-rows-[auto,1fr]">
        <header className="flex items-center p-5 capitalize">
          <div className="flex-1 text-xl font-semibold">
            <i>Readme-js</i>
          </div>
          <div className="flex items-center gap-2">
            <i>LinkOne</i>
            <i>LinkTwo</i>
          </div>
        </header>
        <article className="min-h flex gap-3 p-5 pt-0">
          <section className="flex w-full max-w-80 flex-col gap-3">
            {/* <div className="flex items-center rounded-sm bg-stone-800 p-2">
              <p className="flex-1 text-sm text-stone-400">Sections</p>
              <button className="rounded-sm bg-stone-600 px-2 text-sm text-stone-300">Reset</button>
            </div> */}
            <SectionsButtons setSetctionShift={setSetctionShift} />
            <SectionsBox sectionShift={sectionShift} />
          </section>

          <section className="split-panel-snapping w-full">
            <Split {...splitProps} className="flex h-full border border-stone-100/20">
              <Monaco />
              <Markdown />
            </Split>
            <div className="split-panel-snapping-dots" />
          </section>
        </article>
      </main>
      <style>{dotSnapCss}</style>
    </>
  );
}

export default App;
