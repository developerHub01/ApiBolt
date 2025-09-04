import { memo } from "react";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import ProviderStack from "@/components/app/collections/request/ProviderStack";
import { Outlet } from "react-router-dom";

const LayoutMainPanel = memo(() => {
  return (
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel defaultSize={25}>
        <ProviderStack>
          <Outlet />
        </ProviderStack>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
});

export default LayoutMainPanel;
