import React from "react";
import RequestTopLeft from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/request-top/RequestTopLeft";
import RequestTopRight from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/request-top/RequestTopRight";

const RequestTop = () => {
  return (
    <div className="w-full flex justify-between items-center gap-4 pb-2">
      <RequestTopLeft />
      <RequestTopRight />
    </div>
  );
};
RequestTop.displayName = "Request top";

export default RequestTop;
