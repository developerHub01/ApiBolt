import { memo } from "react";
import type React from "react";
import { Outlet, useParams } from "react-router-dom";
import AppMainContentLayoutWrapper from "@/components/app/AppMainContentLayoutWrapper";
import RequestListPanelWrapper from "@/components/app/collections/request-list/RequestListPanelWrapper";
import TabSidebar from "@/components/app/tab-sidebar/TabSidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import RequestListProvider from "@/context/collections/request-list/RequestListProvider";
import RequestBodyProvider from "@/context/collections/request/RequestBodyProvider";
import RequestHeaderProvider from "@/context/collections/request/RequestHeaderProvider";
import useCheckApplyingLayout from "@/hooks/setting/use-check-applying-layout";
import type { TLayoutSetting } from "@/types/setting.types";

const CollectionsLayout = () => {
  const layoutTypes: TLayoutSetting = useCheckApplyingLayout();

  return (
    <AppMainContentLayoutWrapper>
      {layoutTypes === "ltr" ? <LTRLayout /> : <RTLLayout />}
    </AppMainContentLayoutWrapper>
  );
};

interface ProviderStackProps {
  children: React.ReactNode;
}
const ProviderStack = ({ children }: ProviderStackProps) => (
  <RequestListProvider>
    <RequestBodyProvider>
      <RequestHeaderProvider>{children}</RequestHeaderProvider>
    </RequestBodyProvider>
  </RequestListProvider>
);

const LTRLayout = memo(() => {
  const { id: requestId } = useParams<{ id?: string }>();

  return (
    <>
      <RequestListPanelWrapper />
      <ResizableHandle />
      <ResizablePanel defaultSize={70}>
        <section className="flex w-full h-full">
          {requestId ? (
            <>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={25}>
                  <ProviderStack>
                    <Outlet />
                  </ProviderStack>
                </ResizablePanel>
              </ResizablePanelGroup>
              <TabSidebar />
            </>
          ) : (
            <Outlet />
          )}
        </section>
      </ResizablePanel>
    </>
  );
});

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

export default CollectionsLayout;
