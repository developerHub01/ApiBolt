import React from "react";
import { ResizableHandle } from "@/components/ui/resizable";
import ResponsePanel from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/ResponsePanel";
import RequestTop from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/RequestTop";
import ApiUrl from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/api-url/ApiUrl";
import RequestMetaData from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/RequestMetaData";
import ResizableWrapper from "@/app/(app)/(request-panel)/request/[requestId]/_components/ResizableWrapper";
import RequestPanel from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/RequestPanel";

const RequestPage = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <div className="w-full p-2.5 flex flex-col gap-2">
        <RequestTop />
        <ApiUrl />
        <RequestMetaData />
      </div>
      <ResizableWrapper>
        <RequestPanel />
        <ResizableHandle />
        <ResponsePanel />
      </ResizableWrapper>
    </div>
  );
};

export default RequestPage;
