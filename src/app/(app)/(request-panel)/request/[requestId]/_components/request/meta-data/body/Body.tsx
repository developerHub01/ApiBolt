"use client";

import React, { memo } from "react";
import BeautifyCode from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/body/raw/BeautifyCode";
import BodyDetails from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/body/BodyDetails";
import BodyTypeSelector from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/body/BodyTypeSelector";
import BodyRawDataTypeSelector from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/body/BodyRawDataTypeSelector";

const Body = memo(() => {
  return (
    <div className="h-full flex flex-col gap-3">
      <div className="flex gap-3 items-center flex-wrap">
        <BodyTypeSelector />
        <BodyRawDataTypeSelector />
        {/* format code block */}
        <BeautifyCode />
      </div>
      <BodyDetails />
    </div>
  );
});

export default Body;
