import { ApiBoltResizableWrapper } from "@/components/ui/api-bolt-resizable";
import { Outlet, useParams } from "react-router-dom";
import RequestListPanelWrapper from "@/components/app/mock/request-list/RequestListPanelWrapper";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import MockTabSidebarProvider from "@/context/tab-sidebar/MockTabSidebarProvider";
import MockTabListLayoutWrapper from "@/components/app/mock/MockTabListLayoutWrapper";

const MockLayout = () => {
  const { id: requestId } = useParams<{ id?: string }>();

  return (
    <MockTabSidebarProvider>
      <ApiBoltResizableWrapper leftPanel={<RequestListPanelWrapper />}>
        <MockTabListLayoutWrapper>
          {requestId ? (
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={25}>
                <Outlet />
              </ResizablePanel>
            </ResizablePanelGroup>
          ) : (
            <Outlet />
          )}
        </MockTabListLayoutWrapper>
      </ApiBoltResizableWrapper>
    </MockTabSidebarProvider>
  );
};

export default MockLayout;
