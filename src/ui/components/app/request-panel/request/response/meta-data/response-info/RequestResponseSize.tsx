import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  ArrowUpToLine as UpIcon,
  ArrowDownToLine as DownIcon,
} from "lucide-react";
import { formatSize } from "@/utils";
import Warning from "@/components/warning";
import { useAppSelector } from "@/context/redux/hooks";

const RequestResponseSize = memo(() => {
  const response = useAppSelector(
    (state) => state.requestResponse.response[state.tabSidebar.selectedTab!]
  );
  const requestSize = useAppSelector(
    (state) => state.requestResponse.requestSize[state.tabSidebar.selectedTab!]
  );
  const responseSize = useAppSelector(
    (state) => state.requestResponse.responseSize[state.tabSidebar.selectedTab!]
  );

  if (!response) return null;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Badge className={cn("select-none text-foreground bg-secondary")}>
          {formatSize(responseSize.header + responseSize.body)}
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent
        className="w-60 flex flex-col gap-2 bg-background p-2.5"
        side="bottom"
        align="end"
      >
        <SizeDetails type="request" {...requestSize} />
        <Separator />
        <SizeDetails type="response" {...responseSize} />
        <Warning label="These values are approximate, not exact network size." />
      </HoverCardContent>
    </HoverCard>
  );
});
RequestResponseSize.displayName = "Request response size";

interface SizeDetailsProps {
  type: "request" | "response";
  header: number;
  body: number;
}

const SizeDetails = memo(({ type, header, body }: SizeDetailsProps) => {
  return (
    <div className="w-full flex gap-2">
      <span
        className={cn(
          "w-[22px] h-[22px] bg-green-500 text-white grid place-items-center rounded-md shrink-0",
          {
            "bg-amber-500": type === "request",
            "bg-blue-500": type === "response",
          }
        )}
      >
        {type === "request" ? <UpIcon size={14} /> : <DownIcon size={14} />}
      </span>
      <ul className="w-full flex flex-col gap-1 capitalize [&>li]:text-sm [&>li]:flex [&>li]:justify-between">
        <li className="font-semibold">
          <p>{type} Size</p>
          <p>{formatSize(header + body)}</p>
        </li>
        <li>
          <p>Headers</p>
          <p>{formatSize(header)}</p>
        </li>
        <li>
          <p>Body</p>
          <p>{formatSize(body)}</p>
        </li>
      </ul>
    </div>
  );
});
SizeDetails.displayName = "Size details";

export default RequestResponseSize;
