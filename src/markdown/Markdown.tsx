import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import "github-markdown-css";
import {handleDrafts} from "../utils";
import {useSectionStore} from "../store";

const MarkdownComponent = () => {
  const {sections} = useSectionStore();

  return (
    <Markdown className="markdown-body h-full p-5 text-sm" remarkPlugins={[remarkGfm]}>
      {handleDrafts(sections)}
    </Markdown>
  );
};

export {MarkdownComponent};
