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

const ResponseStatus = memo(() => {
  const { response } = useRequestResponse();
  if (!response) return null;

  const { status, statusText, statusDescription } = response;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Badge
          className={cn("select-none text-foreground bg-secondary", {
            "bg-primary": status < 300 && status >= 200,
            "bg-amber-500": status < 500 && status >= 400,
            "bg-destructive": status >= 500,
          })}
        >
          {status} {statusText}
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent
        className="w-60 flex flex-col gap-1.5 bg-background p-2.5"
        side="bottom"
        align="end"
      >
        <h4 className="text-base font-semibold">
          {status} {statusText}
        </h4>
        <p className="text-sm text-muted-foreground">{statusDescription}</p>
      </HoverCardContent>
    </HoverCard>
  );
});

ResponseStatus.displayName = "Response status";

export default ResponseStatus;
