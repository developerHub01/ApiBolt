import { DragEvent, useCallback } from "react";
import TabListAutoScrollWrapper from "@/components/app/tab-sidebar/vertical/TabListAutoScrollWrapper";
import { useAppDispatch } from "@/context/redux/hooks";
import { handleMoveTab } from "@/context/redux/request-response/request-response-slice";
import { useTabSidebar } from "@/context/tab-sidebar/TabSidebarProvider";
import TabItem from "@/components/app/tab-sidebar/horizontal/TabItem";
import TabSidebarContextMenuWrapper from "@/components/app/tab-sidebar/TabSidebarContextMenuWrapper";

const TabList = () => {
  const dispatch = useAppDispatch();
  const { tabList } = useTabSidebar();

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

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

  return (
    <TabSidebarContextMenuWrapper>
      <TabListAutoScrollWrapper
        className="flex-row py-0"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {tabList.map((tabId, index) => (
          <TabItem key={tabId} id={tabId} index={index} />
        ))}
      </TabListAutoScrollWrapper>
    </TabSidebarContextMenuWrapper>
  );
};

export default TabList;
