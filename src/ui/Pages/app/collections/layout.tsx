import AppMainContentLayoutWrapper from "@/components/app/AppMainContentLayoutWrapper";
import RequestListPanelWrapper from "@/components/app/collections/request-list/RequestListPanelWrapper";
import TabSidebar from "@/components/app/tab-sidebar/TabSidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import RequestOrFolderProvider from "@/context/collections/request-list/RequestOrFolderProvider";
import RequestBodyProvider from "@/context/collections/request/RequestBodyProvider";
import RequestHeaderProvider from "@/context/collections/request/RequestHeaderProvider";
import { Outlet } from "react-router-dom";

const CollectionsLayout = () => {
  return (
    <>
      <AppMainContentLayoutWrapper>
        <RequestListPanelWrapper />
        <ResizableHandle />
        <ResizablePanel defaultSize={70}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={25}>
              <RequestOrFolderProvider>
                <RequestBodyProvider>
                  <RequestHeaderProvider>
                    <Outlet />
                  </RequestHeaderProvider>
                </RequestBodyProvider>
              </RequestOrFolderProvider>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </AppMainContentLayoutWrapper>
      <TabSidebar />
    </>
  );
};

export default CollectionsLayout;
