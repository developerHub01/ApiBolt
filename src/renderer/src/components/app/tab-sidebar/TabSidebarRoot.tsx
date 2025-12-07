import { useCallback, useEffect, useRef, type DragEvent } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import TabItem from "@/components/app/tab-sidebar/TabItem";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useAppDispatch } from "@/context/redux/hooks";
import { handleMoveTab } from "@/context/redux/request-response/request-response-slice";
import TabActionWrapper from "@/components/app/tab-sidebar/TabActionWrapper";
import AutoScrollActiveWrapper from "@/components/ui/auto-scroll-active-wrapper";
import useCheckApplyingLayoutDirection from "@/hooks/setting/use-check-applying-layout-direction";
import type { TLayoutSetting } from "@shared/types/setting.types";
import { useTabSidebar } from "@/context/tab-sidebar/TabSidebarProvider";
import NoTabOpenEmptyBox from "@/components/app/tab-sidebar/empty/NoTabOpenEmptyBox";
import NoTabSearchResultEmptyBox from "@/components/app/tab-sidebar/empty/NoTabSearchResultEmptyBox";
import TabSidebarContextMenuWrapper from "@/components/app/tab-sidebar/TabSidebarContextMenuWrapper";

const TAB_ENTER_LONG_HOVER_TIME = 350;
const TAB_LEAVE_LONG_HOVER_TIME = 500;

const TabSidebarRoot = () => {
  const dispatch = useAppDispatch();
  const hoverEnterTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hoverLeaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const layoutTypes: TLayoutSetting = useCheckApplyingLayoutDirection();
  const {
    localTabList,
    totalTabsOpen,
    isTabListHovering,
    isTabListOpen,
    handleChangeIsTabListHovering,
  } = useTabSidebar();

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

      dispatch(
        handleMoveTab({
          id: draggedId,
        }),
      );
    },
    [dispatch],
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
      initial={{ width: 60 }}
      animate={{ width: isTabListOpen ? 280 : 60 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "h-full flex flex-col absolute right-0 top-0 z-40 gap-0.5 shadow-2xl border-l border-muted-foreground/20",
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
      <ScrollArea
        className="w-full h-full min-h-0 flex-1 pb-0 [&>div>div]:w-full [&>div>div]:h-full"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <TabSidebarContextMenuWrapper>
          <AutoScrollActiveWrapper className="py-1 h-full">
            {!totalTabsOpen ? (
              <>
                {/* if no tabs open */}
                <div className="p-2.5 flex-1">
                  {isTabListOpen && <NoTabOpenEmptyBox />}
                </div>
              </>
            ) : localTabList.length ? (
              <>
                {/* if search list have result */}
                {localTabList.map((tabId, index) => (
                  <TabItem key={tabId} id={tabId} index={index} />
                ))}
              </>
            ) : (
              <>
                {/* if search list empty */}
                <div className="p-2.5 flex-1">
                  {isTabListOpen && <NoTabSearchResultEmptyBox />}
                </div>
              </>
            )}
          </AutoScrollActiveWrapper>
        </TabSidebarContextMenuWrapper>
      </ScrollArea>
      <TabActionWrapper />
    </motion.div>
  );
};

export default TabSidebarRoot;
