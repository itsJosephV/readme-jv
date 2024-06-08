import Markdown, {ExtraProps} from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css";
import rehypeRaw from "rehype-raw";
import SyntaxHighlighter from "react-syntax-highlighter";
import {nightOwl} from "react-syntax-highlighter/dist/esm/styles/hljs";

import {useSectionStore} from "../../store";
import {handleMDFormart} from "../../utils";

const MarkdownComponent = () => {
  const {sections} = useSectionStore();

  return (
    <Markdown
      className="markdown-body overflow-y-auto p-5 prose-ol:list-decimal prose-ul:list-disc"
      components={{
        code({className, children, ...props}) {
          const match = /language-(\w+)/.exec(className || "");

          return match ? (
            <SyntaxHighlighter
              {...(props as ExtraProps)}
              PreTag="div"
              customStyle={{background: "transparent"}}
              language={match[1]}
              style={nightOwl}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
    >
      {handleMDFormart(sections)}
    </Markdown>
  );
};

export {MarkdownComponent};
