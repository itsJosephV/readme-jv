import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import "github-markdown-css";
import Code from "./Code";

import {useSectionStore} from "@/store";
import {handleMDFormart} from "@/utils";

export const PreviewMarkdown = () => {
  const {sections} = useSectionStore();

  console.log(handleMDFormart(sections));

  return (
    <Markdown
      className="markdown-body h-full overflow-y-auto p-5 prose-ol:list-decimal prose-ul:list-disc"
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
