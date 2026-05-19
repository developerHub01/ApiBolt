import { DragEvent, useCallback } from "react";
import { useTabsView } from "@/context/tabs-view/TabsViewProvider";
import TabsView from "@/components/ui/tabs-view/TabsView";

const TabsList = () => {
  const { tabList, handleMoveTab } = useTabsView();

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const draggedId = e.dataTransfer.getData("text/plain");
      if (!draggedId) return;

      handleMoveTab({
        id: draggedId,
      });
    },
    [handleMoveTab],
  );

  return (
    <TabsView.ContextMenuWrapper>
      <TabsView.ListAutoScrollWrapper
        className="flex-row py-0"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {tabList.map((tabId, index) => (
          <TabsView.ItemProvider key={tabId} id={tabId} index={index}>
            <TabsView.XTabsItem />
          </TabsView.ItemProvider>
        ))}
      </TabsView.ListAutoScrollWrapper>
    </TabsView.ContextMenuWrapper>
  );
};

export default TabsList;
