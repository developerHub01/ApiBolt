import React from "react";
import RequestResponseProvider from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import RequestBodyProvider from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestBodyProvider";

interface RequestLayoutProps {
  children: React.ReactNode;
}

const RequestLayout = ({ children }: RequestLayoutProps) => {
  return (
    <RequestResponseProvider>
      <RequestBodyProvider>{children}</RequestBodyProvider>
    </RequestResponseProvider>
  );
};

export default RequestLayout;
