import type { DragEvent } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import TabItem from "@/components/app/tab-sidebar/TabItem";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { AddNewTab } from "@/components/app/tab-sidebar/AddNewTab";
import Empty from "@/components/ui/empty";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  handleChangeIsTabListHovering,
  handleMoveTab,
} from "@/context/redux/request-response/request-response-slice";

const TabSidebar = () => {
  const dispatch = useAppDispatch();
  const isTabListHovering = useAppSelector(
    (state) => state.requestResponse.isTabListHovering
  );
  const tabList = useAppSelector((state) => state.requestResponse.tabList);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("text/plain");
    if (!draggedId) return;

    dispatch(
      handleMoveTab({
        id: draggedId,
      })
    );
  };

  return (
    <div
      className="w-12 relative"
      onMouseEnter={() => dispatch(handleChangeIsTabListHovering(true))}
      onMouseLeave={() => dispatch(handleChangeIsTabListHovering(false))}
    >
      <motion.div
        initial={{ width: 48 }}
        animate={{ width: isTabListHovering ? 280 : 48 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "h-full flex flex-col absolute right-0 top-0 z-[99] bg-background gap-2 shadow-2xl border-l border-muted-foreground/20"
        )}
      >
        <ScrollArea
          className="w-full h-full min-h-0 flex-1 pt-2 pb-0"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <div className="w-full flex flex-col gap-1 pb-1">
            {tabList.length ? (
              <>
                {tabList.map((tabId, index) => (
                  <TabItem id={tabId} index={index} />
                ))}
              </>
            ) : (
              <div className="p-2.5">
                {isTabListHovering && (
                  <Empty label="No tab open" className="min-h-36" />
                )}
              </div>
            )}
          </div>
        </ScrollArea>
        <AddNewTab />
      </motion.div>
    </div>
  );
};

export default TabSidebar;
