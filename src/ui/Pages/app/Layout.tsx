import RequestListPanelWrapper from "@/components/app/request-list/RequestListPanelWrapper";
import Sidebar from "@/components/app/sidebar/Sidebar";
import CopyRight from "@/components/copy-right";
import Header from "@/components/header/Header";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import RequestFolderProvider from "@/context/request-list/RequestFolderProvider";
import SidebarProvider from "@/context/sidebar/SidebarProvider";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <section className="h-dvh flex flex-col">
      <Header />
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
            <RequestListPanelWrapper />
            <ResizableHandle />
            <ResizablePanel defaultSize={70}>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={25}>
                  <RequestFolderProvider>
                    <Outlet />
                  </RequestFolderProvider>
                </ResizablePanel>
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
