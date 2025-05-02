"use client";

import React from "react";
import BodyHTMLPreview from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/body/content/BodyHTMLPreview";
import BodyJSONPreview from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/body/content/body-json-preview/BodyJSONPreview";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import { getResponseType } from "@/utils";
import { TContentType } from "@/types";

const BodyPreview = () => {
  const { response } = useRequestResponse();

  if (!response) return null;

  const responseType = getResponseType(
    response?.headers?.["content-type"] ?? ""
  ).toLowerCase() as TContentType;

  const responseData = response?.data;

  return (
    <>
      {["html", "text"].includes(responseType) && (
        <BodyHTMLPreview data={responseData} />
      )}
      {responseType === "json" && <BodyJSONPreview data={responseData} />}
    </>
  );
};

export default BodyPreview;
