import { memo, useEffect } from "react";
import Code, { type TLanguageType } from "@/components/ui/code";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useRequestCodeSnippit } from "@/context/collections/request/meta-data/code/RequestCodeSnippitProvider";

const RequestCodeContent = memo(() => {
  const { maskedCode, language, lineWrap, handleToggleLineWrap } =
    useRequestCodeSnippit();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === "z") handleToggleLineWrap();
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [handleToggleLineWrap]);

  return (
    <ScrollArea
      className={cn(
        "flex-1 min-h-0 h-full overflow-hidden [&>div>div]:h-full",
        "bg-background/10",
        "rounded-md border",
        "backdrop-blur-xs"
      )}
    >
      <Code
        code={maskedCode}
        contentType={(language as TLanguageType) ?? "text"}
        editable={false}
        zoomable={true}
        lineWrap={lineWrap}
        copy={false}
      />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
});

export default RequestCodeContent;
