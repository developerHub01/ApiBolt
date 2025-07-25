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

const CollectionsLayout = () => {
  return (
    <>
      <AppMainContentLayoutWrapper>
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
      </AppMainContentLayoutWrapper>
    </>
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

export default CollectionsLayout;
