"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";
import Code from "@/components/Code";
import remarkGfm from "remark-gfm";

interface MarkdownPreviewProps {
  code: string;
  className?: string;
  [key: string]: unknown;
}

const MarkdownPreview = ({
  code,
  className,
  ...props
}: MarkdownPreviewProps) => {
  return (
    <div
      className={cn(
        "text-sm leading-relaxed text-foreground break-words",
        className
      )}
      {...props}
    >
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-base font-medium mb-1">{children}</h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-sm font-medium mb-1">{children}</h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-sm font-medium mb-1">{children}</h6>
          ),
          p: ({ children }) => (
            <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal my-6 ml-6 [&>li]:mt-2">{children}</ol>
          ),
          li: ({ children }) => <li>{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="mt-6 border-l-2 pl-6 italic">
              {children}
            </blockquote>
          ),
          code({
            children,
            ...rest
          }: React.ComponentProps<"code"> & { inline?: boolean }) {
            const language = rest.className?.split("language-")?.[1] ?? "";
            if (!language) {
              return (
                <code
                  className="bg-muted px-1.5 py-1 rounded text-xs font-mono"
                  {...rest}
                >
                  {children}
                </code>
              );
            } else if (typeof children === "string") {
              return (
                <Code
                  code={`\`\`\`${language}\n${children}\`\`\``}
                  contentType="markdown"
                  editable={false}
                  className="rounded-md overflow-hidden"
                />
              );
            } else
              return (
                <pre className="bg-muted p-3 rounded overflow-x-auto text-xs font-mono mb-2">
                  <code {...rest}>{children}</code>
                </pre>
              );
          },
          hr: () => <hr className="my-2 border-muted" />,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:opacity-80"
            >
              {children}
            </a>
          ),
          img: ({ src, alt }: React.ComponentProps<"img">) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={typeof src === "string" ? src : ""}
              alt={alt || ""}
              width={400}
              height={300}
              className="my-2 rounded max-w-full h-auto"
            />
          ),
          table: ({ children }: React.ComponentProps<"table">) => (
            <table className="w-full">{children}</table>
          ),
          thead: ({ children }: React.ComponentProps<"thead">) => (
            <thead>{children}</thead>
          ),
          tbody: ({ children }: React.ComponentProps<"thead">) => (
            <tbody>{children}</tbody>
          ),
          tr: ({ children }: React.ComponentProps<"tr">) => (
            <tr className="m-0 border-t p-0 even:bg-muted">{children}</tr>
          ),
          th: ({ children }: React.ComponentProps<"th">) => (
            <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
              {children}
            </th>
          ),
          td: ({ children }: React.ComponentProps<"td">) => (
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              {children}
            </td>
          ),
        }}
      >
        {code}
      </Markdown>
    </div>
  );
};

export default MarkdownPreview;
