import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { handleToggleRequestList } from "@/context/redux/request-response/request-response-slice";
import { selectSidebarActiveTab } from "@/context/redux/sidebar/selectors/sidebar";
import { handleToggleThemeListCollapsed } from "@/context/redux/theme/theme-slice";

const useToggleSidebar = () => {
  const dispatch = useAppDispatch();
  const activeSidebarTab = useAppSelector(selectSidebarActiveTab);

  return () => {
    switch (activeSidebarTab) {
      case "navigate_collections":
        return dispatch(handleToggleRequestList());
      case "navigate_themes_marketplace":
        return dispatch(handleToggleThemeListCollapsed());
    }
  };
};

export default useToggleSidebar;
