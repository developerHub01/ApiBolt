import { useAppSelector } from "@/context/redux/hooks";
import { selectSidebarActiveTab } from "@/context/redux/sidebar/selectors/sidebar";

const useShowSidebarToggler = () => {
  const activeTab = useAppSelector(selectSidebarActiveTab);

  if (activeTab === "navigate_collections") return true;

  return false;
};

export default useShowSidebarToggler;
