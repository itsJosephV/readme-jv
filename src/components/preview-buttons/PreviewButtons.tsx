import {useState} from "react";

import {ToolTip} from "../tooltip";

import {CopiedIcon, CopyIcon, DownloadFile, PreviewIcon, RawIcon} from "@/icons";
import {useSectionStore} from "@/store";
import {cn, handleMDFormart} from "@/utils";
import {type PreviewTabs} from "@/types";
import {GitHubIcon} from "@/icons/GitHubIcon";

type PreviewButtonsProps = {
  previewView: PreviewTabs;
  setPreviewView: (previewView: PreviewTabs) => void;
};

export const PreviewButtons = ({previewView, setPreviewView}: PreviewButtonsProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const {sections} = useSectionStore();

  const rawMDText = handleMDFormart(sections) as string;

  const handleMDCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(rawMDText);
    const timeoutId = setTimeout(() => {
      setIsCopied(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  };

  const isPreview = previewView === "markdown-view";
  const isRaw = previewView === "raw-view";

  const handleMDDownload = () => {
    const blob = new Blob([rawMDText], {type: "text/markdown"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "README.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleMDPreview = () => setPreviewView("markdown-view");
  const handleRawPreview = () => setPreviewView("raw-view");

  return (
    <div className="flex items-center gap-2">
      <ToolTip>
        <ToolTip.Trigger>
          <button
            className="group rounded-md border border-zinc-100/20 bg-zinc-800 p-1.5 disabled:pointer-events-none"
            disabled={isPreview}
            onClick={handleMDPreview}
          >
            <PreviewIcon
              className={cn("size-5 text-zinc-400 transition-colors  group-hover:text-zinc-300", {
                "text-emerald-400": isPreview,
              })}
            />
          </button>
        </ToolTip.Trigger>
        <ToolTip.Content>Preview Markdown</ToolTip.Content>
      </ToolTip>
      <ToolTip>
        <ToolTip.Trigger>
          <button
            className="group rounded-md border border-zinc-100/20 bg-zinc-800 p-1.5 disabled:pointer-events-none"
            disabled={isRaw}
            onClick={handleRawPreview}
          >
            <RawIcon
              className={cn("size-5 text-zinc-400 transition-colors group-hover:text-zinc-300", {
                "text-emerald-400": isRaw,
              })}
            />
          </button>
        </ToolTip.Trigger>
        <ToolTip.Content>Raw Markdown</ToolTip.Content>
      </ToolTip>
      <ToolTip>
        <ToolTip.Trigger>
          <button
            className="group rounded-md border border-zinc-100/20 bg-zinc-800 p-1.5 disabled:pointer-events-none"
            disabled={isCopied}
            onClick={handleMDCopy}
          >
            {isCopied ? (
              <CopiedIcon className="size-5 text-emerald-400" />
            ) : (
              <CopyIcon className="size-5 text-zinc-400 transition-colors group-hover:text-zinc-300" />
            )}
          </button>
        </ToolTip.Trigger>
        <ToolTip.Content>Copy Raw to clipboard</ToolTip.Content>
      </ToolTip>
      <ToolTip>
        <ToolTip.Trigger>
          <button
            className="rounded-md border border-emerald-100/20 bg-emerald-900 p-1.5 text-emerald-100 transition-colors hover:bg-emerald-800"
            data-tooltip-content={"Download markdown file"}
            data-tooltip-id="my-tooltip"
            data-tooltip-place="bottom-start"
            onClick={handleMDDownload}
          >
            <DownloadFile className="size-5" />
          </button>
        </ToolTip.Trigger>
        <ToolTip.Content align="end">Download Markdown</ToolTip.Content>
      </ToolTip>
      <a
        className="rounded-md border border-violet-100/20 bg-violet-900 p-1.5 text-violet-100 transition-colors hover:bg-violet-800"
        href="https://github.com/itsJosephV/readme-jv"
        rel="noopener"
        target="_blank"
      >
        <GitHubIcon className="size-5" />
      </a>
    </div>
  );
};

export default PreviewButtons;
