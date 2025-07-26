import { memo, useCallback, type DragEvent } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import TabItem from "@/components/app/tab-sidebar/TabItem";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Empty from "@/components/ui/empty";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  handleChangeIsTabListHovering,
  handleMoveTab,
} from "@/context/redux/request-response/request-response-slice";
import TabActionWrapper from "@/components/app/tab-sidebar/TabActionWrapper";
import TabSidebarWrapper from "@/components/app/tab-sidebar/TabSidebarWrapper";
import AutoScrollActiveWrapper from "@/components/ui/auto-scroll-active-wrapper";
import useCheckApplyingLayout from "@/hooks/use-check-applying-layout";
import type { TLayoutSetting } from "@/types/setting.types";

const TabSidebar = () => {
  const dispatch = useAppDispatch();
  const layoutTypes: TLayoutSetting = useCheckApplyingLayout();
  const isTabListHovering = useAppSelector(
    (state) => state.requestResponse.isTabListHovering
  );
  const tabList = useAppSelector((state) => state.requestResponse.tabList);

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

  const handleTabListHovering = useCallback(
    (value: boolean) => {
      dispatch(handleChangeIsTabListHovering(value));
    },
    [dispatch]
  );

  return (
    <TabSidebarWrapper>
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
            "h-full flex flex-col absolute right-0 top-0 z-40 gap-2 shadow-2xl border-l border-muted-foreground/20",
            "backdrop-blur-xs hover:backdrop-blur-md transition-all duration-150",
            {
              "right-0 border-l": layoutTypes === "ltr",
              "left-0 border-r": layoutTypes === "rtl",
            }
          )}
          onMouseEnter={() => handleTabListHovering(true)}
          onMouseLeave={() => handleTabListHovering(false)}
        >
          <ScrollArea
            className="w-full h-full min-h-0 flex-1 pb-0 [&>div>div]:w-full"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <AutoScrollActiveWrapper className="py-1">
              {tabList.length ? (
                <>
                  {tabList.map((tabId, index) => (
                    <TabItem id={tabId} index={index} />
                  ))}
                </>
              ) : (
                <div className="p-2.5">{isTabListHovering && <EmptyBox />}</div>
              )}
            </AutoScrollActiveWrapper>
          </ScrollArea>
          <TabActionWrapper />
        </motion.div>
      </div>
    </TabSidebarWrapper>
  );
};

const EmptyBox = memo(() => (
  <div className="w-full p-2">
    <Empty
      label="No tab open"
      description="Your currently tab list is empty. You can start by selecting a request or folder or clicking on the '+' add button to add new tab."
      showFallback
    />
  </div>
));

export default TabSidebar;
