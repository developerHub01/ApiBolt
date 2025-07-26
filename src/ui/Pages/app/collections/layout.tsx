import { memo } from "react";
import type React from "react";
import { Outlet } from "react-router-dom";
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
import useCheckApplyingLayout from "@/hooks/use-check-applying-layout";
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
  <RequestOrFolderProvider>
    <RequestBodyProvider>
      <RequestHeaderProvider>{children}</RequestHeaderProvider>
    </RequestBodyProvider>
  </RequestOrFolderProvider>
);

const LTRLayout = memo(() => {
  return (
    <>
      <RequestListPanelWrapper />
      <ResizableHandle />
      <ResizablePanel defaultSize={70}>
        <section className="flex w-full h-full">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={25}>
              <ProviderStack>
                <Outlet />
              </ProviderStack>
            </ResizablePanel>
          </ResizablePanelGroup>
          <TabSidebar />
        </section>
      </ResizablePanel>
    </>
  );
});

const RTLLayout = memo(() => {
  return (
    <>
      <ResizablePanel defaultSize={70}>
        <section className="flex w-full h-full">
          <TabSidebar />
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={25}>
              <ProviderStack>
                <Outlet />
              </ProviderStack>
            </ResizablePanel>
          </ResizablePanelGroup>
        </section>
      </ResizablePanel>
      <ResizableHandle />
      <RequestListPanelWrapper />
    </>
  );
});

export default CollectionsLayout;
