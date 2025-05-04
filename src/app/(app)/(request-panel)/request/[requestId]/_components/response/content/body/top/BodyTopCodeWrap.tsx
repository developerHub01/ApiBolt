"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/ResponseProvider";

const BodyTopCodeWrap = () => {
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
};
BodyTopCodeWrap.displayName = "Body top code wrap";

export default BodyTopCodeWrap;
