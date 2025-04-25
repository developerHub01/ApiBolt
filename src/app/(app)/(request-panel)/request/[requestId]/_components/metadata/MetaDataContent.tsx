"use client";

import React from "react";
import { useRequest } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestProvider";
import Params from "@/app/(app)/(request-panel)/request/[requestId]/_components/metadata/Params";
import Headers from "@/app/(app)/(request-panel)/request/[requestId]/_components/metadata/Headers";
import Body from "@/app/(app)/(request-panel)/request/[requestId]/_components/metadata/Body/Body";
import Authorization from "@/app/(app)/(request-panel)/request/[requestId]/_components/metadata/Authorization";

const MetaDataContent = () => {
  const { activeMetaTab } = useRequest();

  return (
    <div className="h-full p-2.5 pt-1">
      {activeMetaTab === "params" && <Params />}
      {activeMetaTab === "authorization" && <Authorization />}
      {activeMetaTab === "headers" && <Headers />}
      {activeMetaTab === "body" && <Body />}
    </div>
  );
};

export default MetaDataContent;
