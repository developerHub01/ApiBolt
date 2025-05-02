"use client";

import React, { memo } from "react";
import MetaDataTab from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/meta-data/MetaDataTab";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import ResponseInfo from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/meta-data/response-info/ResponseInfo";

const ResponseMetaData = memo(() => {
  const { response } = useRequestResponse();

  return (
    <div className="flex justify-between items-center gap-2 px-2.5 h-12 min-h-12">
      {response ? (
        <MetaDataTab />
      ) : (
        <p className="select-none text-secondary-foreground">Response</p>
      )}
      <ResponseInfo />
    </div>
  );
});

export default ResponseMetaData;
