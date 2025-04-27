import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import React from "react";
import Sidebar from "@/app/(app)/_components/sidebar/Sidebar";
import RequestListPanel from "@/app/(app)/_components/request-list/RequestListPanel";
import CopyRight from "@/components/copy-right";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <section className="h-screen flex flex-col">
      <section className="h-full flex content-stretch">
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
      <CopyRight />
    </section>
  );
};

export default AppLayout;
