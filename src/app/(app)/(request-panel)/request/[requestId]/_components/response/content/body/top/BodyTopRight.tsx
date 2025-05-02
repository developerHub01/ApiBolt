"use client";

import React, { memo } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import BodyTopCopy from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/body/top/BodyTopCopy";
import BodyTopCodeWrap from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/body/top/BodyTopCodeWrap";
import { useResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/ResponseProvider";

const BodyTopRight = memo(() => {
  const { responseTab } = useResponse();

  if (responseTab !== "raw") return null;
  
  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <BodyTopCodeWrap />
        <BodyTopCopy />
      </TooltipProvider>
    </div>
  );
});

export default BodyTopRight;
