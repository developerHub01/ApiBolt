"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp as ArrowIcon } from "lucide-react";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ResponsCollapseButton = () => {
  const { isResponseCollapsed, handleToggleCollapse } = useRequestResponse();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size={"iconSm"}
            variant={"ghost"}
            onClick={() => handleToggleCollapse()}
          >
            <ArrowIcon
              className={cn("transition-transform duration-500 ease-in-out", {
                "rotate-0": isResponseCollapsed,
                "-rotate-180": !isResponseCollapsed,
              })}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="end">
          <p>{isResponseCollapsed ? "Expend" : "Collaps"} Response Panel</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ResponsCollapseButton;
