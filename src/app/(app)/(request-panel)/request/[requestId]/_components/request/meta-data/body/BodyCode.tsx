"use client";

import React, { memo, useCallback, useEffect, useState } from "react";
import { useRequestBody } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestBodyProvider";
import Code from "@/components/Code";

const BodyCode = memo(() => {
  const {
    rawData = "",
    rawRequestBodyType,
    handleChangeRawData,
  } = useRequestBody();
  const [code, setCode] = useState<string>(rawData);

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
      />
    </div>
  );
});

export default BodyCode;
