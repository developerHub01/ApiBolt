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
    <section className="h-full min-h-screen flex flex-col">
      <Topbar />
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={60}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Request</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={40}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Response</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </section>
  );
};

export default RequestPanelLayout;
