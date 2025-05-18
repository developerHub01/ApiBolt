import AppMainContentLayoutWrapper from "@/components/app/AppMainContentLayoutWrapper";
import RequestListPanelWrapper from "@/components/app/request-list/RequestListPanelWrapper";
import Sidebar from "@/components/app/sidebar/Sidebar";
import TabSidebar from "@/components/app/tab-sidebar/TabSidebar";
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
    <section className="h-dvh overflow-hidden flex flex-col">
      <Header />
      <section className="min-h-0 flex-1 flex content-stretch">
        <SidebarProvider>
          <Sidebar />
          <AppMainContentLayoutWrapper>
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
          </AppMainContentLayoutWrapper>
          <TabSidebar />
        </SidebarProvider>
      </section>
      <CopyRight />
    </section>
  );
};

export default AppLayout;
