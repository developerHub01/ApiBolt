import { memo, Suspense, lazy } from "react";
const TabSidebarRoot = lazy(
  () => import("@/components/app/tab-sidebar/vertical/TabSidebarRoot"),
);
import TabSidebarFallback from "@/fallback/collection/TabSidebarFallback";

const TabSidebar = memo(() => {
  return (
    <div
      className="relative shrink-0"
      style={{
        width: "60px",
      }}
    >
      <Suspense fallback={<TabSidebarFallback />}>
        <TabSidebarRoot />
      </Suspense>
    </div>
  );
});

export default TabSidebar;
