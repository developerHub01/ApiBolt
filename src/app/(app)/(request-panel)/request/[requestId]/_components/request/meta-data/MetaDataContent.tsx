"use client";

import React, { memo } from "react";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import Params from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/headers-params/params/Params";
import Authorization from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/authorization/Authorization";
import Headers from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/headers-params/headers/Headers";
import Body from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/body/Body";

const MetaDataContent = memo(() => {
  const { activeMetaTab } = useRequestResponse();

  return (
    <div className="h-full p-2.5 pt-1">
      {activeMetaTab === "params" && <Params />}
      {activeMetaTab === "authorization" && <Authorization />}
      {activeMetaTab === "headers" && <Headers />}
      {activeMetaTab === "body" && <Body />}
    </div>
  );
});
MetaDataContent.displayName = "Meta data content";

export default MetaDataContent;
