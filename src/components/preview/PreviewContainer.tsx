import {PreviewMarkdown} from "./PreviewMarkdown";
import {RawMD} from "./RawMD";

import {PreviewTabs} from "@/types";

type PreviewContainerProps = {previewView: PreviewTabs};

export const PreviewContainer = ({previewView}: PreviewContainerProps) => {
  const currentPreview: Record<PreviewTabs, JSX.Element> = {
    ["markdown-view"]: <PreviewMarkdown />,
    ["raw-view"]: <RawMD />,
  };

  return <div>{currentPreview[previewView]}</div>;
};
