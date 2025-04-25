import React from "react";
import RequestProvider from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestProvider";

interface RequestPanelLayoutProps {
  children: React.ReactNode;
}

const RequestPanelLayout = ({ children }: RequestPanelLayoutProps) => {
  return (
    <section className="w-full h-full min-h-screen flex flex-col">
      <RequestProvider>{children}</RequestProvider>
    </section>
  );
};

export default RequestPanelLayout;
