import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "github-markdown-css";

import {handleMDFormart} from "../../utils";
import {useSectionStore} from "../../store";

import Code from "./Code";

export const PreviewMarkdown = () => {
  const {sections} = useSectionStore();

  return (
    <Markdown
      className="markdown-body h-full overflow-y-auto p-5 prose-ol:list-decimal prose-ul:list-disc prose-ul:pl-0"
      components={{
        code: ({className, children}) => {
          return <Code className={className}>{children}</Code>;
        },
      }}
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
    >
      {handleMDFormart(sections)}
    </Markdown>
  );
};
