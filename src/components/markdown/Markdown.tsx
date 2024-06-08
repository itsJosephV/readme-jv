import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css";
import rehypeRaw from "rehype-raw";

import {useSectionStore} from "../../store";
import {handleMDFormart} from "../../utils";

const MarkdownComponent = () => {
  const {sections} = useSectionStore();

  return (
    <Markdown
      className="markdown-body overflow-y-auto p-5 prose-ol:list-decimal prose-ul:list-disc"
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
    >
      {handleMDFormart(sections)}
    </Markdown>
  );
};

export {MarkdownComponent};
