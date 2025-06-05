import AddNewTab from "@/components/app/tab-sidebar/AddNewTab";
import ClearAllTabs from "@/components/app/tab-sidebar/ClearAllTabs";

const TabActionWrapper = () => {
  return (
    <div className="w-full flex flex-col p-2 gap-2">
      <AddNewTab />
      <ClearAllTabs />
    </div>
  );
};

export default TabActionWrapper;
