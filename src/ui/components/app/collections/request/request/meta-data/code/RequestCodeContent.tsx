import { memo } from "react";
import Code, { type TLanguageType } from "@/components/ui/code";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useRequestCodeSnippit } from "@/context/collections/request/meta-data/code/RequestCodeSnippitProvider";

const RequestCodeContent = memo(() => {
  const { code, language } = useRequestCodeSnippit();

  return (
    <ScrollArea
      className={cn(
        "flex-1 min-h-0 h-full overflow-hidden [&>div>div]:h-full",
        "bg-background/10 rounded-md border",
        "backdrop-blur-xs"
      )}
    >
      <Code
        code={code}
        contentType={(language as TLanguageType) ?? "text"}
        editable={false}
        zoomable={true}
        lineWrap={true}
        copy={false}
      />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
});

export default RequestCodeContent;
