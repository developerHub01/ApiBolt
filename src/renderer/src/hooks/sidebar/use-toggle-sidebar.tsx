import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { handleToggleRequestList } from "@/context/redux/request-response/request-response-slice";
import { handleToggleRequestList as handleToggleMockRequestList } from "@/context/redux/mock/mock-slice";
import { selectSidebarActiveTab } from "@/context/redux/sidebar/selectors/sidebar";
import { handleToggleThemeListCollapsed } from "@/context/redux/theme/theme-slice";

const useToggleSidebar = () => {
  const dispatch = useAppDispatch();
  const activeSidebarTab = useAppSelector(selectSidebarActiveTab);

  return () => {
    switch (activeSidebarTab) {
      case "navigate_collections":
        return dispatch(handleToggleRequestList());
      case "navigate_mock":
        return dispatch(handleToggleMockRequestList());
      case "navigate_themes_marketplace":
        return dispatch(handleToggleThemeListCollapsed());
      default:
        return;
    }
  };
};

export default useToggleSidebar;
