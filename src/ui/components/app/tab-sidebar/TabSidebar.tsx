import { memo, useCallback, useEffect, useRef, type DragEvent } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import TabItem from "@/components/app/tab-sidebar/TabItem";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useAppDispatch } from "@/context/redux/hooks";
import { handleMoveTab } from "@/context/redux/request-response/request-response-slice";
import TabActionWrapper from "@/components/app/tab-sidebar/TabActionWrapper";
import AutoScrollActiveWrapper from "@/components/ui/auto-scroll-active-wrapper";
import useCheckApplyingLayout from "@/hooks/setting/use-check-applying-layout";
import type { TLayoutSetting } from "@/types/setting.types";
import { useTabSidebar } from "@/context/tab-sidebar/TabSidebarProvider";
import NoTabOpenEmptyBox from "@/components/app/tab-sidebar/empty/NoTabOpenEmptyBox";
import NoTabSearchResultEmptyBox from "@/components/app/tab-sidebar/empty/NoTabSearchResultEmptyBox";

const TAB_ENTER_LONG_HOVER_TIME = 350;
const TAB_LEAVE_LONG_HOVER_TIME = 500;

const TabSidebar = memo(() => {
  const dispatch = useAppDispatch();
  const hoverEnterTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hoverLeaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const layoutTypes: TLayoutSetting = useCheckApplyingLayout();
  const {
    localTabList,
    totalTabsOpen,
    isTabListHovering,
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
    [handleChangeIsTabListHovering, isTabListHovering]
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const draggedId = e.dataTransfer.getData("text/plain");
      if (!draggedId) return;

      dispatch(
        handleMoveTab({
          id: draggedId,
        })
      );
    },
    [dispatch]
  );

  const handleMouseEnter = useCallback(() => {
    /* Start a timer when user hovers | AKA long hover */
    hoverEnterTimeoutRef.current = setTimeout(
      () => handleChangeIsTabListHovering(true),
      TAB_ENTER_LONG_HOVER_TIME
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
      TAB_LEAVE_LONG_HOVER_TIME
    );
  }, [handleChangeIsTabListHovering]);

  return (
    <div
      className="relative shrink-0"
      style={{
        width: "60px",
      }}
    >
      <motion.div
        initial={{ width: 60 }}
        animate={{ width: isTabListHovering ? 280 : 60 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "h-full flex flex-col absolute right-0 top-0 z-40 gap-0.5 shadow-2xl border-l border-muted-foreground/20",
          "bg-background/30",
          "backdrop-blur-lg transition-all duration-150",
          {
            "right-0 border-l": layoutTypes === "ltr",
            "left-0 border-r": layoutTypes === "rtl",
          }
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ScrollArea
          className="w-full h-full min-h-0 flex-1 pb-0 [&>div>div]:w-full [&>div>div]:h-full"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <AutoScrollActiveWrapper className="py-1">
            {!totalTabsOpen ? (
              <>
                {/* if no tabs open */}
                <div className="p-2.5">
                  {isTabListHovering && <NoTabOpenEmptyBox />}
                </div>
              </>
            ) : localTabList.length ? (
              <>
                {/* if search list have result */}
                {localTabList.map((tabId, index) => (
                  <TabItem id={tabId} index={index} />
                ))}
              </>
            ) : (
              <>
                {/* if search list empty */}
                <div className="p-2.5">
                  {isTabListHovering && <NoTabSearchResultEmptyBox />}
                </div>
              </>
            )}
          </AutoScrollActiveWrapper>
        </ScrollArea>
        <TabActionWrapper />
      </motion.div>
    </div>
  );
});

export default TabSidebar;
