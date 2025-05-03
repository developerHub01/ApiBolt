"use client";

import React, { memo, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useRequestBody } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestBodyProvider";
import { formatCode, getParser } from "@/utils/prettierUtils";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const BeautifyCode = memo(() => {
  const {
    rawData: code,
    requestBodyType,
    rawRequestBodyType,
    handleChangeRawData,
  } = useRequestBody();

  const parser = useMemo(
    () => getParser(rawRequestBodyType),
    [rawRequestBodyType]
  );

  const handleClick = useCallback(async () => {
    const { success, data, message } = await formatCode(code, parser);

    if (!success || !data) return message && toast(message);

    handleChangeRawData(data);
  }, [code, parser]);

  if (requestBodyType !== "raw" || rawRequestBodyType === "text") return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size={"sm"} variant={"secondary"} onClick={handleClick}>
            Beautify
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="end">
          <p>Alt + Shift + F</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

export default BeautifyCode;
