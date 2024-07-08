import React from "react";
import {ExtraProps} from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import {nightOwl} from "react-syntax-highlighter/dist/esm/styles/hljs";

type CodeProps = {
  className?: string;
  children: React.ReactNode;
};

const Code = ({className, children, ...props}: CodeProps) => {
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
};

export default Code;
