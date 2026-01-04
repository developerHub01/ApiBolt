import AddNewTab from "@/components/app/tab-sidebar/AddNewTab";
import ClearAllTabs from "@/components/app/tab-sidebar/ClearAllTabs";
import LockTabBar from "@/components/app/tab-sidebar/vertical/LockTabBar";
import TabSearch from "@/components/app/tab-sidebar/vertical/TabSearch";
import { useTabSidebar } from "@/context/tab-sidebar/TabSidebarProvider";

const TabActionWrapper = () => {
  const { haveAnyTabsOpen } = useTabSidebar();

  return (
    <div className="w-full flex flex-col p-2 gap-2">
      {haveAnyTabsOpen && <TabSearch />}
      <AddNewTab />
      {haveAnyTabsOpen && <ClearAllTabs />}
      <LockTabBar />
    </div>
  );
};

export default TabActionWrapper;
