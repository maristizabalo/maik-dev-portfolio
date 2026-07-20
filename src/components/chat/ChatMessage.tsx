"use client";

import { useState } from "react";
import Markdown, { type Components } from "react-markdown";
import { Copy, Check } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

function CodeBlock({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <div className="relative my-3">
      <button
        type="button"
        onClick={copy}
        aria-label="Copy code"
        className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-md border border-line bg-surface-1 text-muted transition-colors hover:text-signal"
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
      </button>
      <pre className="overflow-x-auto rounded-lg border border-line bg-surface-2 p-3 pr-10 text-xs">
        <code className="font-mono">{text}</code>
      </pre>
    </div>
  );
}

const components: Components = {
  p: (props) => <p className="mb-2 leading-relaxed last:mb-0" {...props} />,
  ul: (props) => <ul className="mb-2 list-disc space-y-1 pl-4" {...props} />,
  ol: (props) => <ol className="mb-2 list-decimal space-y-1 pl-4" {...props} />,
  li: (props) => <li className="leading-relaxed" {...props} />,
  strong: (props) => <strong className="font-semibold text-ink" {...props} />,
  h3: (props) => <h3 className="mb-1 mt-3 font-semibold text-ink" {...props} />,
  a: (props) => (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="text-signal underline underline-offset-2"
      {...props}
    />
  ),
  pre: (props) => <>{props.children}</>,
  code: ({ className, children }) => {
    const text = String(children ?? "");
    const isBlock = Boolean(className?.includes("language-")) || text.includes("\n");
    if (isBlock) return <CodeBlock text={text.replace(/\n$/, "")} />;
    return (
      <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-ink">
        {children}
      </code>
    );
  },
};

export function ChatMessage({
  role,
  content,
}: {
  role: "user" | "assistant";
  content: string;
}) {
  if (role === "user") {
    return (
      <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-signal/12 px-4 py-2.5 text-sm text-ink">
        {content}
      </div>
    );
  }
  return (
    <div className={cn("max-w-[92%] text-sm text-muted")}>
      <Markdown components={components}>{content}</Markdown>
    </div>
  );
}
