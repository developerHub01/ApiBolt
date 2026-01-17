import { useRef } from "react";
import { ResizablePanelGroup } from "@/components/ui/resizable";
import type { ImperativePanelGroupHandle } from "react-resizable-panels";

interface AppMainContentLayoutWrapperProps {
  children: React.ReactNode;
}

const AppMainContentLayoutWrapper = ({
  children,
}: AppMainContentLayoutWrapperProps) => {
  const panelGroupRef = useRef<ImperativePanelGroupHandle>(null);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full h-full md:min-w-112.5 relative"
      style={{
        height: "auto",
      }}
      ref={panelGroupRef}
    >
      {children}
    </ResizablePanelGroup>
  );
};

export default AppMainContentLayoutWrapper;
