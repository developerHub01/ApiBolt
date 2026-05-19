import React, { memo } from "react";
import AutoScrollActiveWrapper from "@/components/ui/auto-scroll-active-wrapper";
import { HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";
import { useTabsView } from "@/context/tabs-view/TabsViewProvider";

interface Props extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

const TabsListAutoScrollWrapper = memo(
  ({ children, className, ...props }: Props) => {
    const { selectedTab, totalTabsOpen } = useTabsView();

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

export default TabsListAutoScrollWrapper;
