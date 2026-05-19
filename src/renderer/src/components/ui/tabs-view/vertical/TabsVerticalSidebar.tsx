import { memo, Suspense } from "react";
import TabSidebarFallback from "@/fallback/collection/TabSidebarFallback";
import TabsView from "@/components/ui/tabs-view/TabsView";

const TabsVerticalSidebar = memo(() => {
  return (
    <div
      className="relative shrink-0"
      style={{
        width: "60px",
      }}
    >
      <Suspense fallback={<TabSidebarFallback />}>
        <TabsView.YRoot />
      </Suspense>
    </div>
  );
});

export default TabsVerticalSidebar;
