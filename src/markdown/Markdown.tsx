import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import "github-markdown-css";
import {type SectionProps} from "../types";
import {handleDrafts} from "../utils";

interface MarkdownProps {
  data: SectionProps[];
}

const MarkdownComponent = ({data}: MarkdownProps) => {
  return (
    <Markdown className="markdown-body h-full p-5 text-sm" remarkPlugins={[remarkGfm]}>
      {handleDrafts(data)}
    </Markdown>
  );
};

export {MarkdownComponent};
