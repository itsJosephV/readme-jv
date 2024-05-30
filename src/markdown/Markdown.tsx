import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import "github-markdown-css";

interface MarkdownProps {
  data: string | undefined;
}

const MarkdownComponent = ({data}: MarkdownProps) => {
  return (
    <Markdown className="markdown-body h-full p-5 text-sm" remarkPlugins={[remarkGfm]}>
      {data}
    </Markdown>
  );
};

export {MarkdownComponent};
