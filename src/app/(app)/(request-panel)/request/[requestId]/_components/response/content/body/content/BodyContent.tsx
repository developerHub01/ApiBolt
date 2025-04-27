"use client";

import React, { memo } from "react";
import { useResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/ResponseProvider";
import BodyResponse from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/body/content/BodyResponse";
import BodyPreview from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/body/content/BodyPreview";

const BodyContent = memo(() => {
  const { responseTab } = useResponse();
  
  return (
    <div className="w-full h-full grow">
      {responseTab === "raw" && <BodyResponse />}
      {responseTab === "preview" && <BodyPreview />}
    </div>
  );
});

export default BodyContent;
