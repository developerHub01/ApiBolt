import { memo } from "react";
import Code from "@/components/ui/code";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { TContentType } from "@shared/types/request-response.types";
import { useHistoryDetails } from "@/context/history/HistoryDetailsProvider";

interface Props {
  code: string;
  contentType?: TContentType;
}

const BodyRaw = memo(({ code, contentType = "text" }: Props) => {
  const { codeWrap, handleToggleCodeWrap } = useHistoryDetails();
  return (
    <ScrollArea
      className={cn(
        "flex-1 min-h-0 h-full overflow-hidden [&>div>div]:h-full",
        "rounded-md border",
        "bg-background/10",
        "backdrop-blur-xs",
      )}
    >
      <Code
        code={code}
        contentType={contentType}
        editable={false}
        zoomable={true}
        lineWrap={codeWrap}
        handleLineWrap={handleToggleCodeWrap}
        innerClassName="pb-3"
        className="static"
      />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
});

export default BodyRaw;
