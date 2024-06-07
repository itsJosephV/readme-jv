import Split from "react-split";
import {useState} from "react";

import {MarkdownComponent as Markdown} from "./markdown";
import {MonacoComponent as Monaco} from "./monaco";
import Sections from "./sections/Sections";
import {createGutterElement, handleSnapCenter} from "./utils";

function App() {
  const [sizes, setSizes] = useState([50, 50]);
  const snapThresHold = 5;

  const dotSnapCss = `
  .split-panel-snapping {
    position: relative;
  }

  .split-panel-snapping-dots::after {
    content: '';
    position: absolute;
    top: -10px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #404040;
    transform: translateX(-50%);
  }

  .split-panel-snapping-dots::after {
    left: 50%;
  }`;

  return (
    <>
      <main className="grid h-screen grid-rows-[auto,1fr] px-5 pb-5">
        <header className="text-xl font-bold capitalize leading-[4rem]">readme-jv</header>
        <article className="grid grid-cols-[auto,1fr] gap-3">
          <aside className="flex flex-col gap-2 rounded-md border border-stone-100/20 p-3">
            <Sections />
          </aside>

          <section className="split-panel-snapping">
            <Split
              className="flex h-full"
              cursor="col-resize"
              direction="horizontal"
              expandToMin={true}
              gutter={(_, direction) => createGutterElement(direction)}
              gutterAlign="center"
              gutterSize={12}
              minSize={100}
              sizes={sizes}
              onDrag={(sizes) => setSizes(sizes)}
              onDragEnd={(sizes) => handleSnapCenter({sizes, snapThresHold, setSizes})}
            >
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
