"use client";

import React from "react";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import HeaderContent from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/headers/HeaderContent";
import Empty from "@/components/Empty";
import { ScrollArea } from "@/components/ui/scroll-area";

const Headers = () => {
  const { response } = useRequestResponse();
  const headers = response?.headers as Record<string, string>;

  return (
    <ScrollArea className="h-full">
      {headers ? (
        <HeaderContent headers={headers} />
      ) : (
        <Empty label="No headers found" />
      )}
    </ScrollArea>
  );
};
Headers.displayName = "Headers";

export default Headers;
