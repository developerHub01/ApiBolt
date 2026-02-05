import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useTabSidebar } from "@/context/tab-sidebar/TabSidebarProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import TabItem from "@/components/app/tab-sidebar/horizontal/TabItem";
import { cn } from "@/lib/utils";

const TabSearchResult = () => {
  const { localTabList } = useTabSidebar();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const totalTabs = useMemo(() => localTabList.length, [localTabList]);

  useLayoutEffect(() => {
    const element = scrollRef?.current;
    if (!element) return;

    const hasScroll = element.scrollHeight > element.clientHeight;

    const frame = requestAnimationFrame(() => {
      if (hasScroll !== isScrollable) setIsScrollable(hasScroll);
    });

    return () => cancelAnimationFrame(frame);
  }, [totalTabs, isScrollable]);

  if (!localTabList.length) return null;

  return (
    <ScrollArea>
      <div
        ref={scrollRef}
        className={cn("w-full flex flex-col max-h-80", {
          "pr-2": isScrollable,
        })}
      >
        {localTabList.map((tabId, index) => (
          <TabItem
            key={tabId}
            id={tabId}
            index={index}
            className="w-full max-w-full border-l-0"
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default TabSearchResult;
