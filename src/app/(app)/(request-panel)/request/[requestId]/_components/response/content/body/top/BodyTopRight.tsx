"use client";

import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import BodyTopCopy from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/body/top/BodyTopCopy";

const BodyTopRight = () => {
  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <BodyTopCopy />
      </TooltipProvider>
    </div>
  );
};

export default BodyTopRight;
