"use client";

import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy as CopyIcon } from "lucide-react";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import { toast } from "sonner";

const BodyTopCopy = () => {
  const { response } = useRequestResponse();

  const handleCopy = useCallback(async () => {
    const responseData = response?.data ? JSON.stringify(response?.data) : "";

    await navigator.clipboard.writeText(responseData);

    toast("Copied to clipboard!!");
  }, [response]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size={"iconSm"} variant={"ghost"} onClick={handleCopy}>
          <CopyIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>Copy</p>
      </TooltipContent>
    </Tooltip>
  );
};
BodyTopCopy.dispalyName = "Body top copy";

export default BodyTopCopy;
