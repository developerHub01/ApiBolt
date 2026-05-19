import { ApiBoltResizableWrapper } from "@/components/ui/api-bolt-resizable";
import { Outlet, useParams } from "react-router-dom";
import RequestListPanelWrapper from "@/components/app/collections/request-list/RequestListPanelWrapper";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import ProviderStack from "@/components/app/collections/request/ProviderStack";
import RequestTabSidebarProvider from "@/context/tab-sidebar/RequestTabSidebarProvider";
import RequestTabListLayoutWrapper from "@/components/app/collections/RequestTabListLayoutWrapper";

const CollectionsLayout = () => {
  const { id: requestId } = useParams<{ id?: string }>();

  return (
    <RequestTabSidebarProvider>
      <ApiBoltResizableWrapper leftPanel={<RequestListPanelWrapper />}>
        <RequestTabListLayoutWrapper>
          {requestId ? (
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={25}>
                <ProviderStack>
                  <Outlet />
                </ProviderStack>
              </ResizablePanel>
            </ResizablePanelGroup>
          ) : (
            <Outlet />
          )}
        </RequestTabListLayoutWrapper>
      </ApiBoltResizableWrapper>
    </RequestTabSidebarProvider>
  );
};

export default CollectionsLayout;
