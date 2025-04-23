import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import React from "react";
import Topbar from "@/app/(app)/(request-panel)/_components/Topbar";

interface RequestPanelLayoutProps {
  children: React.ReactNode;
}

const RequestPanelLayout = ({ children }: RequestPanelLayoutProps) => {
  return (
    <section className="w-full h-full min-h-screen flex flex-col">
      <Topbar />
      {children}
    </section>
  );
};

export default RequestPanelLayout;
