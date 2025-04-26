"use client";

import React, { memo } from "react";
import BodyTop from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/body/top/BodyTop";
import BodyContent from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/body/content/BodyContent";

const Body = memo(() => {
  return (
    <div className="h-full flex flex-col gap-3">
      <BodyTop />
      <BodyContent />
    </div>
  );
});

export default Body;
