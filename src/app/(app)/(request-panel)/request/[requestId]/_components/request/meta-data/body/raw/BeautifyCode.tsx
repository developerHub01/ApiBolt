"use client";

import React, { memo, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useRequestBody } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestBodyProvider";
import { formatCode, getParser } from "@/utils/prettierUtils";
import { toast } from "sonner";

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
    <Button size={"sm"} variant={"secondary"} onClick={handleClick}>
      Beautify
    </Button>
  );
});

export default BeautifyCode;
