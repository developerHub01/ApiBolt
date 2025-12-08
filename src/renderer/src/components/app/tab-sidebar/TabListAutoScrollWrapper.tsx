import React, { memo } from "react";
import { useTabSidebar } from "@/context/tab-sidebar/TabSidebarProvider";
import AutoScrollActiveWrapper from "@/components/ui/auto-scroll-active-wrapper";

interface Props {
  children: React.ReactNode;
}

const TabListAutoScrollWrapper = memo(({ children }: Props) => {
  const { selectedTab, totalTabsOpen, handleChangeIsTabListHovering } =
    useTabSidebar();

  return (
    <AutoScrollActiveWrapper
      className="py-1 h-full"
      scrollDependency={[selectedTab, totalTabsOpen]}
    >
      {children}
    </AutoScrollActiveWrapper>
  );
});

export default TabListAutoScrollWrapper;
