import {CurrentPreviewView} from "../../types";

import {RawMD} from "./RawMD";
import {PreviewMarkdown} from "./PreviewMarkdown";

export const PreviewContainer = ({previewView}: {previewView: CurrentPreviewView}) => {
  const currentPreview: Record<CurrentPreviewView, JSX.Element> = {
    [CurrentPreviewView.MD_PREVIEW]: <PreviewMarkdown />,
    [CurrentPreviewView.MD_RAW]: <RawMD />,
  };

  return <div>{currentPreview[previewView]}</div>;
};
