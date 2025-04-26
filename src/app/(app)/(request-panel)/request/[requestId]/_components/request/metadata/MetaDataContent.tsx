"use client";

import React from "react";
import { useRequest } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestProvider";
import Params from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/metadata/Params";
import Authorization from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/metadata/Authorization";
import Headers from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/metadata/Headers";
import Body from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/metadata/Body/Body";

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
