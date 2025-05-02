"use client";

import React, { memo, useCallback, useEffect, useState } from "react";
import { useRequestBody } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestBodyProvider";
import Code from "@/components/Code";
import { formatCode, getParser } from "@/utils/prettierUtils";
import { toast } from "sonner";
import { TContentType } from "@/types";

const codeFormatter = async (
  rawRequestBodyType: TContentType,
  code: string,
  callback: (code: string) => void
) => {
  const parser = getParser(rawRequestBodyType);
  const { success, data, message } = await formatCode(code, parser);
  if (!code) return;
  if (!success || !data) return message && toast(message);
  callback(data);
};

const BodyCode = memo(() => {
  const {
    rawData = "",
    rawRequestBodyType,
    handleChangeRawData,
    codeLineWrap,
  } = useRequestBody();
  const [code, setCode] = useState<string>(rawData);

  const handleFormat = useCallback(
    () => codeFormatter(rawRequestBodyType, code, setCode),
    [code]
  );

  useEffect(() => {
    setCode(rawData);
  }, [rawData]);

  const handleChange = useCallback((value: string) => setCode(value), []);
  const handleBlur = useCallback(() => handleChangeRawData(code), [code]);

  return (
    <div className="w-full h-full border rounded-md overflow-hidden">
      <Code
        code={code}
        contentType={rawRequestBodyType}
        onChange={handleChange}
        onBlur={handleBlur}
        zoomable={true}
        lineWrap={codeLineWrap}
        handleFormat={handleFormat}
      />
    </div>
  );
});

export default BodyCode;
