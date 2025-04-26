import React from "react";
import RequestResponseProvider from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";

interface RequestPanelLayoutProps {
  children: React.ReactNode;
}

const RequestPanelLayout = ({ children }: RequestPanelLayoutProps) => {
  return (
    <section className="w-full h-full min-h-screen flex flex-col">
      <RequestResponseProvider>{children}</RequestResponseProvider>
    </section>
  );
};

export default RequestPanelLayout;
