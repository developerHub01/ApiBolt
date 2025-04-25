import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import React from "react";
import Sidebar from "@/app/(app)/_components/sidebar/Sidebar";
import RequestListPanel from "@/app/(app)/_components/request-list/RequestListPanel";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <section className="h-full min-h-screen flex content-stretch">
      <Sidebar />
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full rounded-lg border md:min-w-[450px]"
        style={{
          height: "auto",
        }}
      >
        <ResizablePanel
          defaultSize={30}
          style={{
            maxWidth: "40vw",
          }}
        >
          <RequestListPanel />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={70}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={25}>{children}</ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </section>
  );
};

export default AppLayout;
