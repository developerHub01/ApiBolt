"use client";

import React, { memo } from "react";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
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

const RequestResponseSize = memo(() => {
  const { response, requestSize, responseSize } = useRequestResponse();

  if (!response) return null;

  console.log({ requestSize, responseSize });

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Badge className={cn("select-none text-foreground bg-secondary")}>
          {responseSize.header + responseSize.body} B
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent
        className="w-60 flex flex-col gap-2 bg-background p-2.5"
        side="top"
        align="end"
      >
        <SizeDetails type="request" {...requestSize} />
        <Separator />
        <SizeDetails type="response" {...responseSize} />
      </HoverCardContent>
    </HoverCard>
  );
});

interface SizeDetailsProps {
  type: "request" | "response";
  header: number;
  body: number;
}

const SizeDetails = memo(({ type, header, body }: SizeDetailsProps) => {
  return (
    <div className="w-full flex gap-1.5">
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
          <p>{header + body} B</p>
        </li>
        <li>
          <p>Headers</p>
          <p>{header} B</p>
        </li>
        <li>
          <p>Body</p>
          <p>{body} B</p>
        </li>
      </ul>
    </div>
  );
});

export default RequestResponseSize;
