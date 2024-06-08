import Split, {SplitProps} from "react-split";
import {useState} from "react";

import {MarkdownComponent as Markdown} from "./components/markdown";
import {MonacoComponent as Monaco} from "./components/monaco";
import {createGutterElement, handleSnapCenter} from "./utils";
import {CurrentSection} from "./types";
import SectionSwitcher from "./components/sections-switch/SectionSwitcher";
import Sections from "./components/sections/Sections";

function App() {
  const [sizes, setSizes] = useState([50, 50]);
  const [sectionShift, setSetctionShift] = useState<CurrentSection>(CurrentSection.MY_SECTIONS);
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
      <main className="grid h-screen grid-rows-[auto,1fr]">
        {/* <header className="text-xl font-bold capitalize leading-[4rem]">readme-jv</header> */}
        <article className="flex min-h-screen gap-3 p-5">
          <section className="flex w-full max-w-80 flex-col gap-3">
            <SectionSwitcher setSetctionShift={setSetctionShift} />
            <Sections sectionShift={sectionShift} />
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
