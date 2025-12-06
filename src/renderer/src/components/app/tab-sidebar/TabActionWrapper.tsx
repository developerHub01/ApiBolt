import AddNewTab from "@/components/app/tab-sidebar/AddNewTab";
import ClearAllTabs from "@/components/app/tab-sidebar/ClearAllTabs";
import PinTabBar from "@/components/app/tab-sidebar/PinTabBar";
import TabSearch from "@/components/app/tab-sidebar/tab-search/TabSearch";

const TabActionWrapper = () => {
  return (
    <div className="w-full flex flex-col p-2 gap-2">
      <TabSearch />
      <AddNewTab />
      <ClearAllTabs />
      <PinTabBar />
    </div>
  );
};

export default TabActionWrapper;
