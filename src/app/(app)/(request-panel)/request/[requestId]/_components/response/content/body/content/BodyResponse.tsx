"use client";

import React, { memo, useEffect, useMemo, useState } from "react";
import Code from "@/components/Code";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import { getResponseType } from "@/utils";
import { TContentType } from "@/types";
import { formatCode, getParser } from "@/utils/prettierUtils";
import { useResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/ResponseProvider";

const BodyResponse = memo(() => {
  const { response } = useRequestResponse();
  const { responseCodeWrap } = useResponse();
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
    <Code
      code={formattedCode}
      contentType={responseType}
      editable={false}
      zoomable={true}
      lineWrap={responseCodeWrap}
    />
  );
});

export default BodyResponse;
