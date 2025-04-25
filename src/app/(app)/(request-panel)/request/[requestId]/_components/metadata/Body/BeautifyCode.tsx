"use client";

import React, { useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useRequestBody } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestBodyProvider";
import { formatCode } from "@/utils/prettierUtils";
import { toast } from "sonner";

const getParser = (type: string) => {
  switch (type) {
    case "json":
      return "json";
    case "html":
    case "xml":
      return "html";
    default:
      return "babel";
  }
};

const BeautifyCode = () => {
  const {
    rawData: code,
    rawRequestBodyType,
    handleChangeRawData,
  } = useRequestBody();

  const parser = useMemo(
    () => getParser(rawRequestBodyType),
    [rawRequestBodyType]
  );

  const handleClick = useCallback(async () => {
    const { success, data, message } = await formatCode(code, parser);

    if (!success || !data) return toast(message);

    handleChangeRawData(data);
  }, [code, parser]);

  return (
    <Button
      size={"sm"}
      variant={"ghost"}
      className="ml-auto"
      onClick={handleClick}
    >
      Beautify
    </Button>
  );
};

export default BeautifyCode;
