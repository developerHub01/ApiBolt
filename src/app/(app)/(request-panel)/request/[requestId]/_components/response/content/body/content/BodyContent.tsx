"use client";

import React from "react";
import { useResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/ResponseProvider";
import BodyResponse from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/body/content/BodyResponse";
import BodyPreview from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/body/content/BodyPreview";

const BodyContent = () => {
  const { responseTab } = useResponse();
  return (
    <>
      {responseTab === "raw" && <BodyResponse />}
      {responseTab === "preview" && <BodyPreview />}
    </>
  );
};

export default BodyContent;
