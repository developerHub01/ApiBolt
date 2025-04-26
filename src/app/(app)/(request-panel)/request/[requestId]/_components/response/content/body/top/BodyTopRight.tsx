"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Copy as CopyIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const BodyTopRight = () => {
  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size={"iconSm"} variant={"ghost"}>
              <CopyIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Copy</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default BodyTopRight;
