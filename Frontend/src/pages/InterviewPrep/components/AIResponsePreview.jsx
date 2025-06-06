import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { LuCopy, LuCheck } from "react-icons/lu";

const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 rounded-lg border border-gray-300 bg-[#f8f8f8] dark:bg-[#1e1e1e] dark:border-gray-700 shadow-sm overflow-hidden">
      <button
        onClick={copyCode}
        className="absolute right-3 top-3 text-sm bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 flex items-center gap-1 transition"
      >
        {copied ? (
          <>
            <LuCheck className="text-green-600" />
            Copied
          </>
        ) : (
          <>
            <LuCopy />
            Copy
          </>
        )}
      </button>
      <SyntaxHighlighter
        style={oneLight}
        language={language}
        PreTag="div"
        className="text-[15px] md:text-[16px] p-5 font-mono leading-relaxed"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};


const AIResponsePreview = ({ content }) => {
  if (!content) return null;

  return (
    <div className="prose prose-zinc max-w-none dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children }) {
            const match = /language-(\w+)/.exec(className || "");
            const code = String(children).replace(/\n$/, "");

            return !inline && match ? (
              <CodeBlock code={code} language={match[1]} />
            ) : (
              <code className="bg-zinc-100 px-1 py-0.5 rounded text-sm">
                {children}
              </code>
            );
          },
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mt-6 mb-3">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold mt-5 mb-2">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-medium mt-4 mb-2">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-medium mt-4 mb-1">{children}</h4>
          ),
          p: ({ children }) => (
            <p className="text-base leading-relaxed mb-4">{children}</p>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
              {children}
            </blockquote>
          ),
          ul: ({ children }) => (
            <ul className="list-disc ml-6 mb-4">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal ml-6 mb-4">{children}</ol>
          ),
          li: ({ children }) => <li className="mb-1">{children}</li>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="w-full border border-gray-300">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-100">{children}</thead>
          ),
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => <tr className="border-t">{children}</tr>,
          th: ({ children }) => (
            <th className="text-left px-4 py-2 font-semibold">{children}</th>
          ),
          td: ({ children }) => <td className="px-4 py-2">{children}</td>,
          hr: () => <hr className="my-6 border-gray-300" />,
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt}
              className="rounded-md max-w-full h-auto my-4"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default AIResponsePreview;
