"use client";

import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { useResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/ResponseProvider";

const BodyTopCodeWrap = memo(() => {
  const { responseCodeWrap, handleToggleResponseCodeWrap } = useResponse();
  return (
    <Button
      size={"sm"}
      variant={"ghost"}
      onClick={handleToggleResponseCodeWrap}
    >
      {responseCodeWrap ? "Unwrap" : "Wrap"}
    </Button>
  );
});

export default BodyTopCodeWrap;
