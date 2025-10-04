import { memo } from "react";
import Code from "@/components/ui/code";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const RequestCodeContent = memo(() => {
  return (
    <ScrollArea
      className={cn(
        "flex-1 min-h-0 h-full overflow-hidden [&>div>div]:h-full",
        "bg-background/10 rounded-md border",
        "backdrop-blur-xs"
      )}
    >
      <Code
        code={""}
        contentType={"text"}
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
