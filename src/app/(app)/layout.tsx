import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import React from "react";
import Sidebar from "@/app/(app)/_components/sidebar/Sidebar";
import RequestListPanel from "@/app/(app)/_components/request-list/_components/RequestListPanel";
import CopyRight from "@/components/copy-right";
import SidebarProvider from "@/app/(app)/_context/SidebarProvider";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <section className="h-dvh flex flex-col">
      <section className="h-full flex content-stretch">
        <SidebarProvider>
          <Sidebar />
          <ResizablePanelGroup
            direction="horizontal"
            className="w-full border md:min-w-[450px]"
            style={{
              height: "auto",
            }}
          >
            <RequestListPanel />
            <ResizableHandle />
            <ResizablePanel defaultSize={70}>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={25}>{children}</ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </SidebarProvider>
      </section>
      <CopyRight />
    </section>
  );
};

export default AppLayout;
