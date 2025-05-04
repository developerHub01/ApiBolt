"use client";

import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import BodyTopCopy from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/body/top/BodyTopCopy";
import BodyTopCodeWrap from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/body/top/BodyTopCodeWrap";
import { useResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/ResponseProvider";

const BodyTopRight = () => {
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
};

BodyTopRight.displayName = "Body top right";

export default BodyTopRight;
