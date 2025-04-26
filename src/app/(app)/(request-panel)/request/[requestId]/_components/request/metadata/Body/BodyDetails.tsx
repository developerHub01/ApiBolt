"use client";

import React, { memo } from "react";
import BodyNone from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/metadata/Body/BodyNone";
import BodyCode from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/metadata/Body/BodyCode";

interface BodyDetailsInterface {
  bodyType: string;
}

const BodyDetails = memo(({ bodyType }: BodyDetailsInterface) => {
  return (
    <>
      {bodyType === "none" && <BodyNone />}
      {bodyType === "raw" && <BodyCode />}
    </>
  );
});

export default BodyDetails;
