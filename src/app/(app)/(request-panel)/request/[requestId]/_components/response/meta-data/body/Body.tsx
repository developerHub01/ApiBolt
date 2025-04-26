"use client";

import React, { memo } from "react";
import BodyTop from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/meta-data/body/top/BodyTop";

const Body = memo(() => {
  return (
    <div className="h-full flex flex-col gap-3">
      <BodyTop />
    </div>
  );
});

export default Body;
