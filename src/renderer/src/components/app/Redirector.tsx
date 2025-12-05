import { useEffect } from "react";
import { useAppSelector } from "@/context/redux/hooks";
import { useNavigate } from "react-router-dom";
import {
  SIDEBAR_MENU_ID_PATH_MAP,
  SIDEBAR_MENU_LIST,
  SIDEBAR_THEME_MENU_ID_PATH_MAP,
  SIDEBAR_THEME_MENU_IDS,
  SIDEBAR_THEME_MENU_ITEMS,
} from "@/constant/sidebar.constant";
import { selectSidebarActiveTab } from "@/context/redux/sidebar/selectors/sidebar";
import { selectSelectedTab } from "@/context/redux/request-response/selectors/tab-list";
import { selectActiveRequestOrFolder } from "@/context/redux/request-response/selectors/request-list";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";
import { selectIsPorjectLoading } from "@/context/redux/status/selectors/projects";
import { selectSidebarActiveTabIsLoading } from "@/context/redux/status/selectors/sidebar";

const DEFAULT_ROUTE = "/projects";

const Redirector = () => {
  const navigate = useNavigate();
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const isProjectsLoading = useAppSelector(selectIsPorjectLoading);
  const isSidebarActiveTabIsLoading = useAppSelector(
    selectSidebarActiveTabIsLoading,
  );
  const selectedTab = useAppSelector(selectSelectedTab);
  const activeRequestOrFolder = useAppSelector(selectActiveRequestOrFolder);
  const sidebarActiveTab =
    useAppSelector(selectSidebarActiveTab) ?? "navigate_projects";

  useEffect(() => {
    if (isProjectsLoading || isSidebarActiveTabIsLoading) return;

    let route = "";
    if (!activeProjectId) {
      route = SIDEBAR_MENU_ID_PATH_MAP[sidebarActiveTab] ?? DEFAULT_ROUTE;
    } else if (SIDEBAR_THEME_MENU_IDS.has(sidebarActiveTab)) {
      route = SIDEBAR_THEME_MENU_ID_PATH_MAP[sidebarActiveTab] ?? DEFAULT_ROUTE;
    } else if (
      sidebarActiveTab === "navigate_collections" &&
      activeRequestOrFolder
    ) {
      route = `${route}${SIDEBAR_MENU_ID_PATH_MAP["navigate_collections"]}/${activeRequestOrFolder.method ? "request" : "folder"}/${activeRequestOrFolder.id}`;
    } else route = SIDEBAR_MENU_ID_PATH_MAP[sidebarActiveTab] ?? "/";

    /* find the path from the list */
    if (location.pathname === route) return;

    navigate(route);
  }, [
    isProjectsLoading,
    isSidebarActiveTabIsLoading,
    activeRequestOrFolder,
    activeProjectId,
    selectedTab,
    sidebarActiveTab,
    navigate,
  ]);

  return null;
};

export default Redirector;
