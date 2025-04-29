import React from "react";
import RequestParamsHeadersProvider from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestParamsHeadersProvider";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MetaDataWrapperProps {
  children: React.ReactNode;
}

const MetaDataWrapper = ({ children }: MetaDataWrapperProps) => {
  return (
    <RequestParamsHeadersProvider>
      <ScrollArea className="h-full">
        <div className="h-full flex flex-col gap-3">{children}</div>
      </ScrollArea>
    </RequestParamsHeadersProvider>
  );
};

export default MetaDataWrapper;
