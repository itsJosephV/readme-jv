import {useState} from "react";
import CopyToClipboard from "react-copy-to-clipboard";

import {CopiedIcon} from "../../icons/CopiedIcon";
import {cn, handleMDFormart} from "../../utils";
import {CurrentPreviewView} from "../../types";
import {useSectionStore} from "../../store";
import {CopyIcon, PreviewIcon, RawIcon} from "../../icons";
import {DownloadFile} from "../../icons/DownloadFile";

export const PreviewButtons = ({
  previewView,
  setPreviewView,
}: {
  previewView: CurrentPreviewView;
  setPreviewView: (previewView: CurrentPreviewView) => void;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleIsCopied = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const {sections} = useSectionStore();

  const rawMDText = handleMDFormart(sections) as string;

  const isPreview = previewView === CurrentPreviewView.MD_PREVIEW;
  const isRaw = previewView === CurrentPreviewView.MD_RAW;

  const handleDownloadMD = () => {
    const blob = new Blob([rawMDText], {type: "text/markdown"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "README.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleMDPreview = () => setPreviewView(CurrentPreviewView.MD_PREVIEW);
  const handleRawPreview = () => setPreviewView(CurrentPreviewView.MD_RAW);

  return (
    <div className="flex gap-2">
      <button
        className="group rounded-md border border-stone-100/20 bg-stone-800 p-1.5 disabled:pointer-events-none"
        disabled={isPreview}
        onClick={handleMDPreview}
      >
        <PreviewIcon
          className={cn("size-5 text-stone-400 transition-colors  group-hover:text-stone-300", {
            "text-emerald-400": isPreview,
          })}
        />
      </button>
      <button
        className="group rounded-md border border-stone-100/20 bg-stone-800 p-1.5 disabled:pointer-events-none "
        disabled={isRaw}
        onClick={handleRawPreview}
      >
        <RawIcon
          className={cn("size-5 text-stone-400 transition-colors group-hover:text-stone-300", {
            "text-emerald-400": isRaw,
          })}
        />
      </button>
      <CopyToClipboard text={rawMDText} onCopy={handleIsCopied}>
        <button
          className="group rounded-md border border-stone-100/20 bg-stone-800 p-1.5 disabled:pointer-events-none"
          disabled={isCopied}
        >
          {isCopied ? (
            <CopiedIcon className="size-5 text-emerald-400" />
          ) : (
            <CopyIcon className="size-5 text-stone-400 transition-colors group-hover:text-stone-300" />
          )}
        </button>
      </CopyToClipboard>
      <button
        className="flex items-center gap-0.5 rounded-md bg-emerald-900 px-2.5 text-emerald-100"
        data-tooltip-content={"Download markdown file"}
        data-tooltip-id="my-tooltip"
        data-tooltip-place="bottom-start"
        onClick={handleDownloadMD}
      >
        <DownloadFile className="size-5" />
        <span>.md</span>
      </button>
    </div>
  );
};

export default PreviewButtons;
