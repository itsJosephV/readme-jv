import {PreviewMarkdown} from "./PreviewMarkdown";
import {RawMD} from "./RawMD";

import {CurrentPreviewView} from "@/types";

type PreviewContainerProps = {previewView: CurrentPreviewView};

export const PreviewContainer = ({previewView}: PreviewContainerProps) => {
  const currentPreview: Record<CurrentPreviewView, JSX.Element> = {
    [CurrentPreviewView.MD_PREVIEW]: <PreviewMarkdown />,
    [CurrentPreviewView.MD_RAW]: <RawMD />,
  };

  return <div>{currentPreview[previewView]}</div>;
};
