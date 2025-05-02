"use client";

import React, { memo } from "react";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import { Badge } from "@/components/ui/badge";
import useHttpStatusDetail from "@/hooks/use-http-status-detail";
import { Skeleton } from "@/components/ui/skeleton";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

const ResponseStatus = memo(() => {
  const { response } = useRequestResponse();

  const { status, statusText } = response || { status: 0, statusText: "" };

  const { loading, detail, error } = useHttpStatusDetail(status);

  console.log({ loading, detail, status, statusText, error });

  if (loading) return <Skeleton className="h-6 w-12 rounded-md" />;
  if (error || [detail, status].some((item) => !item)) return null;

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
        side="top"
        align="end"
      >
        <h4 className="text-base font-semibold">
          {status} {statusText ?? detail?.reason}
        </h4>
        <p className="text-sm text-muted-foreground">
          {detail?.description || "Unknown status code"}
        </p>
      </HoverCardContent>
    </HoverCard>
  );
});

export default ResponseStatus;
