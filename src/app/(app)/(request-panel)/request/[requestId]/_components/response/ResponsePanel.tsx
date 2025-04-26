import React from "react";
import ResponseMetaData from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/meta-data/ResponseMetaData";

const ResponsePanel = () => {
  return (
    <div className="flex flex-col h-full p-2.5">
      <ResponseMetaData />
    </div>
  );
};

export default ResponsePanel;
