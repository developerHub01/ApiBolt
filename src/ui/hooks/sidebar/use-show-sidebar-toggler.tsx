import { SIDEBAR_TOGGLE_BUTTON_ALLOWED_IDS } from "@/constant/sidebar.constant";
import { useAppSelector } from "@/context/redux/hooks";
import { selectSidebarActiveTab } from "@/context/redux/sidebar/selectors/sidebar";

const useShowSidebarToggler = () => {
  const activeTab = useAppSelector(selectSidebarActiveTab);
  return SIDEBAR_TOGGLE_BUTTON_ALLOWED_IDS.has(activeTab);
};

export default useShowSidebarToggler;
