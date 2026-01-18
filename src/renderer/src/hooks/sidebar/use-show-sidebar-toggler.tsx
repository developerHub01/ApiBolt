import { useAppSelector } from "@/context/redux/hooks";
import { selectSidebarActiveTab } from "@/context/redux/sidebar/selectors/sidebar";
import { TSidebarTab } from "@shared/types/sidebar.types";

const showableTabsId = new Set<TSidebarTab>(["navigate_collections"]);

const useShowSidebarToggler = () => {
  const activeTab = useAppSelector(selectSidebarActiveTab);
  return showableTabsId.has(activeTab);
};

export default useShowSidebarToggler;
