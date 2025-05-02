"use client";

import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { useRequestBody } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestBodyProvider";

const ToggleCodeLineWrap = memo(() => {
  const { requestBodyType, codeLineWrap, handleToggleCodeLineWrap } =
    useRequestBody();

  if (requestBodyType !== "raw") return null;

  return (
    <Button size={"sm"} variant={"ghost"} onClick={handleToggleCodeLineWrap}>
      Line {codeLineWrap ? "Unwrap" : "Wrap"}
    </Button>
  );
});

export default ToggleCodeLineWrap;
