import { memo } from "react";
import { Outlet, useParams } from "react-router-dom";
import RequestListPanelWrapper from "@/components/app/collections/request-list/RequestListPanelWrapper";
import TabSidebar from "@/components/app/tab-sidebar/TabSidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ProviderStack from "@/components/app/collections/request/ProviderStack";

const RTLLayout = memo(() => {
  const { id: requestId } = useParams<{ id?: string }>();

  return (
    <>
      <ResizablePanel defaultSize={70}>
        <section className="flex w-full h-full">
          {requestId ? (
            <>
              <TabSidebar />
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
        </section>
      </ResizablePanel>
      <ResizableHandle />
      <RequestListPanelWrapper />
    </>
  );
});

export default RTLLayout;
