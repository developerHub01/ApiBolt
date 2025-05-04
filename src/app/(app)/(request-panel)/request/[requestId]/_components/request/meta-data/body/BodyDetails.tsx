"use client";

import React, { memo } from "react";
import BodyCode from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/body/raw/BodyCode";
import Empty from "@/components/Empty";
import BodyBinary from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/body/binary/BodyBinary";
import XWWWFormUrlencoded from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/body/x-www-form-urlencoded/XWWWFormUrlencoded";
import FormData from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/body/form-data/FormData";
import { useRequestBody } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestBodyProvider";

const BodyDetails = memo(() => {
  const { requestBodyType } = useRequestBody();
  return (
    <>
      {requestBodyType === "none" && (
        <Empty label="This request doesn't have a body" />
      )}
      {requestBodyType === "form-data" && <FormData />}
      {requestBodyType === "x-www-form-urlencoded" && <XWWWFormUrlencoded />}
      {requestBodyType === "raw" && <BodyCode />}
      {requestBodyType === "binary" && <BodyBinary />}
    </>
  );
});

BodyDetails.displayName = "Request body details";

export default BodyDetails;
