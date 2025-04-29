"use client";

import React, { memo } from "react";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import HeaderContent from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/headers/HeaderContent";
import Empty from "@/components/Empty";

const Headers = memo(() => {
  const { response } = useRequestResponse();
  const headers = response?.headers as Record<string, string>;

  return (
    <>
      {headers ? (
        <HeaderContent headers={headers} />
      ) : (
        <Empty label="No headers found" />
      )}
    </>
  );
});

export default Headers;
