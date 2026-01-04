import React, { memo } from "react";
import { useTabSidebar } from "@/context/tab-sidebar/TabSidebarProvider";
import AutoScrollActiveWrapper from "@/components/ui/auto-scroll-active-wrapper";
import { HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

interface Props extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

const TabListAutoScrollWrapper = memo(
  ({ children, className, ...props }: Props) => {
    const { selectedTab, totalTabsOpen } = useTabSidebar();

    return (
      <AutoScrollActiveWrapper
        className={cn("py-1 h-full", className)}
        scrollDependency={[selectedTab, totalTabsOpen]}
        {...props}
      >
        {children}
      </AutoScrollActiveWrapper>
    );
  },
);

export default TabListAutoScrollWrapper;
