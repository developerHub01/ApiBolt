import React from "react";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";
import Code from "@/components/ui/code";
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
      className={cn("text-sm text-foreground select-text", className)}
      {...props}
    >
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold tracking-tight mt-6 mb-4 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold tracking-tight mt-6 mb-3 pb-1 border-b first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold tracking-tight mt-5 mb-3">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-medium mt-4 mb-2">{children}</h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-base font-medium mt-4 mb-2">{children}</h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-sm font-medium mt-4 mb-2">{children}</h6>
          ),
          p: ({ children }) => <p className="leading-7 my-3">{children}</p>,
          ul: ({ children }) => (
            <ul className="list-disc pl-6 my-4">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 my-4">{children}</ol>
          ),
          li: ({ children }) => <li className="mt-1">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 pl-4 italic my-4 text-muted-foreground">
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
                  className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono"
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
                  copy={true}
                  className="rounded-md overflow-hidden border"
                  lineWrap
                />
              );
            } else
              return (
                <pre className="bg-muted p-3 rounded overflow-x-auto text-xs font-mono my-4">
                  <code {...rest}>{children}</code>
                </pre>
              );
          },
          hr: () => <hr className="my-6 border-muted" />,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:opacity-80"
            >
              {children}
            </a>
          ),
          img: ({ src, alt }: React.ComponentProps<"img">) => (
            <img
              src={typeof src === "string" ? src : ""}
              alt={alt || ""}
              width={400}
              height={300}
              className="my-4 rounded max-w-full h-auto"
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
