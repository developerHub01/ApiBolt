"use client";

import { Button } from "@/components/ui/button";
import { Play as PreviewIcon } from "lucide-react";
import React from "react";
import { useResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/ResponseProvider";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import { getResponseType } from "@/utils";

const BodyTopLeft = () => {
  const { responseTab, handleChangeActiveResponseTab } = useResponse();
  const { response } = useRequestResponse();

  const responseType = getResponseType(
    String(response?.headers?.["content-type"] ?? "")
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
};

BodyTopLeft.displayName = "Body top left";

export default BodyTopLeft;
