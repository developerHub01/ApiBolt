import { ApiBoltResizableWrapper } from "@/components/ui/api-bolt-resizable";
import { Outlet, useParams } from "react-router-dom";
import RequestListPanelWrapper from "@/components/app/collections/request-list/RequestListPanelWrapper";
import TabSidebar from "@/components/app/tab-sidebar/TabSidebar";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import ProviderStack from "@/components/app/collections/request/ProviderStack";

const CollectionsLayout = () => {
  const { id: requestId } = useParams<{ id?: string }>();

  return (
    <ApiBoltResizableWrapper leftPanel={<RequestListPanelWrapper />}>
      {requestId ? (
        <>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={25}>
              <ProviderStack>
                <Outlet />
              </ProviderStack>
            </ResizablePanel>
          </ResizablePanelGroup>
        </>
      ) : (
        <Outlet />
      )}
      <TabSidebar />
    </ApiBoltResizableWrapper>
  );
};

export default CollectionsLayout;
