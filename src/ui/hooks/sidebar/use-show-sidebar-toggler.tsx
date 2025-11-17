import { useAppSelector } from "@/context/redux/hooks";
import { selectSidebarActiveTab } from "@/context/redux/sidebar/selectors/sidebar";
import { useLocation } from "react-router-dom";

const useShowSidebarToggler = () => {
  const activeTab = useAppSelector(selectSidebarActiveTab);
  const location = useLocation();

  if (
    activeTab === "navigate_collections" ||
    (activeTab === "navigate_themes" &&
      location.pathname === "/themes/marketplace")
  )
    return true;

  return false;
};

export default useShowSidebarToggler;
