import React, { memo } from "react";
import { ResizablePanel } from "@/components/ui/resizable";
import { useSidebar } from "@/context/sidebar/SidebarProvider";

interface RequestListPanelWrapperProps {
  children: React.ReactNode;
}

const RequestListPanelWrapper = memo(
  ({ children }: RequestListPanelWrapperProps) => {
    const { activeTab } = useSidebar();

    if (!activeTab) return null;

    return (
      <ResizablePanel
        collapsible={true}
        defaultSize={30}
        style={{
          maxWidth: "40vw",
        }}
      >
        {children}
      </ResizablePanel>
    );
  }
);

RequestListPanelWrapper.displayName = "Request list panel wrapper";

export default RequestListPanelWrapper;
