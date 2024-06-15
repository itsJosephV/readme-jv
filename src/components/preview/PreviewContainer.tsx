import {PreviewMarkdown} from "./PreviewMarkdown";
import {RawMD} from "./RawMD";

import {CurrentPreviewView} from "@/types";

export const PreviewContainer = ({previewView}: {previewView: CurrentPreviewView}) => {
  const currentPreview: Record<CurrentPreviewView, JSX.Element> = {
    [CurrentPreviewView.MD_PREVIEW]: <PreviewMarkdown />,
    [CurrentPreviewView.MD_RAW]: <RawMD />,
  };

  return <div>{currentPreview[previewView]}</div>;
};
