"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import RequestTop from "@/app/(app)/(request-panel)/request/[requestId]/_components/RequestTop";
import APIUrl from "@/app/(app)/(request-panel)/request/[requestId]/_components/APIUrl";

const RequestPanel = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <ScrollArea className="w-full h-full p-3">
        <div className="w-full flex flex-col gap-2">
          <RequestTop />
          <APIUrl />
        </div>
      </ScrollArea>
    </div>
  );
};

export default RequestPanel;
