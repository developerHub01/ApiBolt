import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useTabsView } from "@/context/tabs-view/TabsViewProvider";
import TabsView from "@/components/ui/tabs-view/TabsView";

const TabsSearchResult = () => {
  const { localTabList } = useTabsView();
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

  if (!totalTabs) return null;

  return (
    <ScrollArea>
      <div
        ref={scrollRef}
        className={cn("w-full flex flex-col max-h-80", {
          "pr-2": isScrollable,
        })}
      >
        {localTabList.map((tabId, index) => (
          <TabsView.ItemProvider key={tabId} id={tabId} index={index}>
            <TabsView.XTabsItem className="w-full max-w-full border-l-0" />
          </TabsView.ItemProvider>
        ))}
      </div>
    </ScrollArea>
  );
};

export default TabsSearchResult;
