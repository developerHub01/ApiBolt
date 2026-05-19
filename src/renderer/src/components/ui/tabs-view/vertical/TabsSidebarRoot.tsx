import { useCallback, useEffect, useRef, type DragEvent } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useTabsView } from "@/context/tabs-view/TabsViewProvider";
import TabsView from "@/components/ui/tabs-view/TabsView";

const TAB_ENTER_LONG_HOVER_TIME = 350;
const TAB_LEAVE_LONG_HOVER_TIME = 500;

const TabsSidebarRoot = () => {
  const hoverEnterTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hoverLeaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const {
    localTabList,
    totalTabsOpen,
    isTabListHovering,
    isTabListOpen,
    handleChangeIsTabListHovering,
    layoutTypes,
    handleRemove,
  } = useTabsView();

  useEffect(() => {
    return () => {
      if (hoverEnterTimeoutRef.current)
        clearTimeout(hoverEnterTimeoutRef.current);
      if (hoverLeaveTimeoutRef.current)
        clearTimeout(hoverLeaveTimeoutRef.current);
    };
  }, []);

  const handleDragOver = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!isTabListHovering) handleChangeIsTabListHovering(true);
    },
    [handleChangeIsTabListHovering, isTabListHovering],
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const draggedId = e.dataTransfer.getData("text/plain");
      if (!draggedId) return;
      handleRemove({
        id: draggedId,
        type: "current",
      });
    },
    [handleRemove],
  );

  const handleMouseEnter = useCallback(() => {
    /* Start a timer when user hovers | AKA long hover */
    hoverEnterTimeoutRef.current = setTimeout(
      () => handleChangeIsTabListHovering(true),
      TAB_ENTER_LONG_HOVER_TIME,
    );
  }, [handleChangeIsTabListHovering]);

  const handleMouseLeave = useCallback(() => {
    // If they leave early, cancel expansion
    if (hoverEnterTimeoutRef.current) {
      clearTimeout(hoverEnterTimeoutRef.current);
      hoverEnterTimeoutRef.current = null;
    }
    if (hoverLeaveTimeoutRef.current) {
      clearTimeout(hoverLeaveTimeoutRef.current);
      hoverLeaveTimeoutRef.current = null;
    }

    // Also collapse if it was already expanded
    hoverLeaveTimeoutRef.current = setTimeout(
      () => handleChangeIsTabListHovering(false),
      TAB_LEAVE_LONG_HOVER_TIME,
    );
  }, [handleChangeIsTabListHovering]);

  return (
    <motion.div
      initial={{
        width: 60,
      }}
      animate={{
        width: isTabListOpen ? 280 : 60,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className={cn(
        "h-full flex flex-col absolute right-0 top-0 z-40 gap-0.5 pt-1 shadow-2xl border-l border-muted-foreground/20",
        "bg-secondary/30",
        "backdrop-blur-lg transition-all duration-150",
        {
          "right-0 border-l": layoutTypes === "ltr",
          "left-0 border-r": layoutTypes === "rtl",
        },
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="flex overflow-x-auto no-scrollbar scroll-smooth flex-1"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <TabsView.ContextMenuWrapper className="no-scrollbar scroll-smooth">
          <TabsView.ListAutoScrollWrapper className="no-scrollbar scroll-smooth">
            {!totalTabsOpen ? (
              <>
                {/* if no tabs open */}
                <div className="p-2.5 flex-1">
                  {isTabListOpen && <TabsView.NoTabOpenEmptyBox />}
                </div>
              </>
            ) : localTabList.length ? (
              <>
                {/* if search list have result */}
                {localTabList.map((tabId, index) => (
                  <TabsView.ItemProvider key={tabId} id={tabId} index={index}>
                    <TabsView.YTabsItem />
                  </TabsView.ItemProvider>
                ))}
              </>
            ) : (
              <>
                {/* if search list empty */}
                <div className="p-2.5 flex-1">
                  {isTabListOpen && <TabsView.NoTabSearchResultEmptyBox />}
                </div>
              </>
            )}
          </TabsView.ListAutoScrollWrapper>
        </TabsView.ContextMenuWrapper>
      </div>
      <TabsView.XActionWrapper />
    </motion.div>
  );
};

export default TabsSidebarRoot;
