"use client";

import React, { memo } from "react";
import { useResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/ResponseProvider";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import Body from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/body/Body";
import Cookies from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/cookies/Cookies";
import Headers from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/headers/Headers";
import EmptyResponse from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/EmptyResponse";

const ResposneContent = memo(() => {
  const { activeMetaTab } = useResponse();
  const { response } = useRequestResponse();

  if (!response) return <EmptyResponse />;

  return (
    <div className="p-2.5 pt-1 flex-1 min-h-0">
      {activeMetaTab === "body" && <Body />}
      {activeMetaTab === "cookies" && <Cookies />}
      {activeMetaTab === "headers" && <Headers />}
    </div>
  );
});
ResposneContent.displayName = "Resposne content";

export default ResposneContent;
