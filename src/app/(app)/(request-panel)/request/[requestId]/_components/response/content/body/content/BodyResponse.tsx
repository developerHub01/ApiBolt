"use client";

import Code from "@/components/Code";
import React, { memo, useEffect, useMemo, useState } from "react";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import { getResponseType } from "@/utils";
import { TContentType } from "@/types";
import { formatCode, getParser } from "@/utils/prettierUtils";

const BodyResponse = memo(() => {
  const { response } = useRequestResponse();
  const [formattedCode, setFormattedCode] = useState("");

  const responseType = getResponseType(
    response?.headers?.["content-type"] ?? ""
  ).toLowerCase() as TContentType;

  const parser = useMemo(() => getParser(responseType), [responseType]);

  useEffect(() => {
    if (!response) return;

    const stringCode =
      parser === "json"
        ? JSON.stringify(response.data, null, 2)
        : String(response.data);

    const format = async () => {
      const { success, data } = await formatCode(stringCode, parser);
      if (!success || !data) {
        setFormattedCode(stringCode);
      } else {
        setFormattedCode(data);
      }
    };

    format();
  }, [response, parser]);

  if (!response) return;

  return (
    <Code code={formattedCode} contentType={responseType} editable={false} />
  );
});

export default BodyResponse;
