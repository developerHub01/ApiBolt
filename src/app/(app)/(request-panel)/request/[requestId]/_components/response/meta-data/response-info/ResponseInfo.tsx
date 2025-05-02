import React from "react";
import ResponseStatus from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/meta-data/response-info/ResponseStatus";
import RequestResponseSize from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/meta-data/response-info/RequestResponseSize";

const ResponseInfo = () => {
  return (
    <div className="flex items-center gap-1.5">
      <ResponseStatus />
      <RequestResponseSize />
    </div>
  );
};

export default ResponseInfo;
