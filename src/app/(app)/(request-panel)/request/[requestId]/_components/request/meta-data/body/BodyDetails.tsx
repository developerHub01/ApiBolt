"use client";

import React, { memo } from "react";
import BodyCode from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/body/raw/BodyCode";
import Empty from "@/components/Empty";
import BodyBinary from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/body/binary/BodyBinary";
import XWWWFormUrlencoded from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/body/x-www-form-urlencoded/XWWWFormUrlencoded";
import { TRequestBodyType } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestBodyProvider";

interface BodyDetailsInterface {
  bodyType: TRequestBodyType;
}

const BodyDetails = memo(({ bodyType }: BodyDetailsInterface) => {
  return (
    <>
      {bodyType === "none" && (
        <Empty label="This request doesn't have a body" />
      )}
      {bodyType === "x-www-form-urlencoded" && <XWWWFormUrlencoded />}
      {bodyType === "raw" && <BodyCode />}
      {bodyType === "binary" && <BodyBinary />}
    </>
  );
});

export default BodyDetails;
