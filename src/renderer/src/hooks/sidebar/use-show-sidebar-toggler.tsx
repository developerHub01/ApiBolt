import { SIDEBAR_THEME_MENU_ITEMS } from "@/constant/sidebar.constant";
import { useAppSelector } from "@/context/redux/hooks";
import { selectSidebarActiveTab } from "@/context/redux/sidebar/selectors/sidebar";

const THEM_MARKETPLACE_MENU_DETAILS = SIDEBAR_THEME_MENU_ITEMS.find(
  item => item.id === "navigate_themes_marketplace",
);

const useShowSidebarToggler = () => {
  const activeTab = useAppSelector(selectSidebarActiveTab);

  if (
    activeTab === "navigate_collections" ||
    activeTab === THEM_MARKETPLACE_MENU_DETAILS?.id
  )
    return true;

  return false;
};

export default useShowSidebarToggler;
