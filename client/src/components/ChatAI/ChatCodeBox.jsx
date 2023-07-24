import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
// import remarkGfm from "remark-gfm";
// import SyntaxHighlighter from "react-syntax-highlighter";
// import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import rehypeHighlight from "rehype-highlight";
import ReactMarkdown from "react-markdown";
export const ChatCodeBox = ({ codeString }) => {
  const [isCopied, setIsCopied] = useState();
  return (
    <div className="chat-code-box">
      <div className="p-10">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Stack_Overflow_icon.svg"
          alt="stack overflow logo"
          width={"32"}
        />
      </div>
      <div className="code-box">
        <ReactMarkdown
          className=""
          linkTarget={"_blank"}
          rehypePlugins={[[rehypeHighlight, { detect: true }]]}
        >
          {codeString}
        </ReactMarkdown>
        <div className="copy-to-clipboard">
          <CopyToClipboard
            text={codeString}
            onCopy={() => {
              setIsCopied(true);
            }}
          >
            <button>{isCopied ? "Copied ✅" : "Copy code"}</button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
};
