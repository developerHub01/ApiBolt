import React from "react";
import BodyTopLeft from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/meta-data/body/top/BodyTopLeft";
import BodyTopRight from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/meta-data/body/top/BodyTopRight";

const BodyTop = () => {
  return (
    <div className="flex justify-between items-center gap-2">
      <BodyTopLeft />
      <BodyTopRight />
    </div>
  );
};

export default BodyTop;
