"use client";

import { Button } from "@/components/ui/button";
import { Play as PreviewIcon } from "lucide-react";
import React, { memo } from "react";
import { useResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/ResponseProvider";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import { getResponseType } from "@/utils";

const BodyTopLeft = memo(() => {
  const { responseTab, handleChangeActiveResponseTab } = useResponse();
  const { response } = useRequestResponse();

  const responseType = getResponseType(
    response?.headers?.["content-type"] ?? ""
  );

  return (
    <div className="flex items-center gap-2">
      <Button
        size={"sm"}
        variant={responseTab === "raw" ? "secondary" : "ghost"}
        onClick={() => handleChangeActiveResponseTab("raw")}
      >
        {responseType}
      </Button>
      <Button
        size={"sm"}
        variant={responseTab === "preview" ? "secondary" : "ghost"}
        onClick={() => handleChangeActiveResponseTab("preview")}
      >
        <PreviewIcon /> Preview
      </Button>
    </div>
  );
});

export default BodyTopLeft;
