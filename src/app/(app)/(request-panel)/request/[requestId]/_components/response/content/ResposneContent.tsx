"use client";

import React, { memo } from "react";
import { useResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/ResponseProvider";
import Body from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/body/Body";
import Cookies from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/cookies/Cookies";
import Headers from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/headers/Headers";

const ResposneContent = memo(() => {
  const { activeMetaTab } = useResponse();

  return (
    <div className="p-2.5 pt-1">
      {activeMetaTab === "body" && <Body />}
      {activeMetaTab === "cookies" && <Cookies />}
      {activeMetaTab === "headers" && <Headers />}
    </div>
  );
});

export default ResposneContent;
