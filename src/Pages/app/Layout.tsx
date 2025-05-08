import RequestListPanel from "@/components/app/request-list/RequestListPanel";
import Sidebar from "@/components/app/sidebar/Sidebar";
import CopyRight from "@/components/copy-right";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import SidebarProvider from "@/context/sidebar/SidebarProvider";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
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
                <ResizablePanel defaultSize={25}>
                  <Outlet />
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
