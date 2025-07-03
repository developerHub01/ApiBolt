import RequestBodyProvider from "@/context/request/RequestBodyProvider";
import RequestHeaderProvider from "@/context/request/RequestHeaderProvider";
import TabSidebar from "@/components/app/tab-sidebar/TabSidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import RequestFolderProvider from "@/context/request-list/RequestOrFolderProvider";
import AppMainContentLayoutWrapper from "@/components/app/AppMainContentLayoutWrapper";
import RequestListPanelWrapper from "@/components/app/request-list/RequestListPanelWrapper";
import { Outlet } from "react-router-dom";

const RequestLayout = () => {
  return (
    <>
      <AppMainContentLayoutWrapper>
        <RequestListPanelWrapper />
        <ResizableHandle />
        <ResizablePanel defaultSize={70}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={25}>
              <RequestFolderProvider>
                <RequestBodyProvider>
                  <RequestHeaderProvider>
                    <Outlet />
                  </RequestHeaderProvider>
                </RequestBodyProvider>
              </RequestFolderProvider>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </AppMainContentLayoutWrapper>
      <TabSidebar />
    </>
  );
};

export default RequestLayout;
