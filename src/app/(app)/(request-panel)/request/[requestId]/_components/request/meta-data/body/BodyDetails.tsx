"use client";

import React, { memo } from "react";
import BodyCode from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/body/BodyCode";
import Empty from "@/components/Empty";
import BodyBinary from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/body/BodyBinary";

interface BodyDetailsInterface {
  bodyType: string;
}

const BodyDetails = memo(({ bodyType }: BodyDetailsInterface) => {
  return (
    <>
      {bodyType === "none" && (
        <Empty label="This request doesn't have a body" />
      )}
      {bodyType === "raw" && <BodyCode />}
      {bodyType === "binary" && <BodyBinary />}
    </>
  );
});

export default BodyDetails;
