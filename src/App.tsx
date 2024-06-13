import Split, {SplitProps} from "react-split";
import {useState} from "react";
import CopyToClipboard from "react-copy-to-clipboard";

import {cn, createGutterElement, handleMDFormart, handleSnapCenter} from "./utils";
import {CurrentPreviewView, CurrentSectionView} from "./types";
import SectionsButtons from "./components/sections-buttons/SectionsButtons";
import {PreviewContainer} from "./components/preview";
import {SectionsContainer} from "./components/sections";
import {SectionEditor} from "./components/editor";
import {CopyIcon, PreviewIcon} from "./icons";
import {RawIcon} from "./icons/RawIcon";
import {useSectionStore} from "./store";
import {CopiedIcon} from "./icons/CopiedIcon";

function App() {
  const [sizes, setSizes] = useState([50, 50]);
  const [sectionView, setSectionView] = useState<CurrentSectionView>(
    CurrentSectionView.MY_SECTIONS,
  );
  const [previewView, setPreviewView] = useState<CurrentPreviewView>(CurrentPreviewView.MD_PREVIEW);
  const [isSectionSelected, setIsSectionSelected] = useState<boolean>(false);

  const [isCopied, setIsCopied] = useState(false);

  const handleIsCopied = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const {sections} = useSectionStore();

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

  /**
   * Copy to clipboard component testing
   * Not necessary in this case
   */

  // import {CopyIcon} from "../../icons/CopyIcon";
  //onCopy={() => this.setState({copied: true})}
  // <div className="relative">
  {
    /* <CopyToClipboard text={children}>
        <button className="absolute right-2 top-2 rounded-md bg-stone-800 p-2 opacity-60">
          <CopyIcon className="size-4" />
        </button>
      </CopyToClipboard> */
  }

  const rawMDToCopy = handleMDFormart(sections);

  return (
    <>
      <article className="grid h-full max-h-screen grid-rows-[auto,1fr]">
        <header className="flex items-center px-5 py-3.5 capitalize">
          <div className="flex-1 text-xl font-semibold">
            <p>Readme-jv</p>
          </div>
          <div className="flex gap-2">
            <button
              className="rounded-md border border-stone-100/20 bg-stone-800 p-1.5"
              onClick={handleMDPreview}
            >
              <PreviewIcon
                className={cn("size-5 text-stone-300", {
                  "text-emerald-400": previewView === CurrentPreviewView.MD_PREVIEW,
                })}
              />
            </button>
            <button
              className="rounded-md border border-stone-100/20 bg-stone-800 p-1.5"
              onClick={handleRawPreview}
            >
              <RawIcon
                className={cn("size-5 text-stone-300", {
                  "text-emerald-400": previewView === CurrentPreviewView.MD_RAW,
                })}
              />
            </button>
            <CopyToClipboard text={rawMDToCopy as string} onCopy={handleIsCopied}>
              <button className="rounded-md border border-stone-100/20 bg-stone-800 p-1.5">
                {isCopied ? (
                  <CopiedIcon className="size-5 text-stone-300" />
                ) : (
                  <CopyIcon className="size-5 text-stone-300" />
                )}
              </button>
            </CopyToClipboard>
            <button className="rounded-md bg-stone-600 px-2.5 py-0.5">Download</button>
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
