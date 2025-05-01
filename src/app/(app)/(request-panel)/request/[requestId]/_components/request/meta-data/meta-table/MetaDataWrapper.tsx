import React from "react";
import RequestParamsHeadersProvider from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestMetaTableProvider";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MetaDataWrapperProps {
  label?: string;
  children: React.ReactNode;
}

const MetaDataWrapper = ({ label, children }: MetaDataWrapperProps) => {
  return (
    <RequestParamsHeadersProvider>
      <ScrollArea className="min-h-0 h-full">
        <div className="h-full flex flex-col gap-3">
          {label && (
            <p className="text-foreground text-sm select-none">{label}</p>
          )}
          {children}
        </div>
      </ScrollArea>
    </RequestParamsHeadersProvider>
  );
};

export default MetaDataWrapper;
