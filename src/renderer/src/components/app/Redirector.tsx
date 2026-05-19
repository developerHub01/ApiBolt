import { useEffect } from "react";
import { useAppSelector } from "@/context/redux/hooks";
import { useNavigate } from "react-router-dom";
import { SIDEBAR_MENU_ID_PATH_MAP } from "@/constant/sidebar.constant";
import { selectSidebarActiveTab } from "@/context/redux/sidebar/selectors/sidebar";
import { selectSelectedTab } from "@/context/redux/request-response/selectors/tab-list";
import { selectActiveRequestOrFolder as selectActiveMockRequestOrFolder } from "@/context/redux/mock/selectors/request-list";
import { selectActiveRequestOrFolder } from "@/context/redux/request-response/selectors/request-list";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";
import { selectIsPorjectLoading } from "@/context/redux/status/selectors/projects";
import { selectSidebarActiveTabIsLoading } from "@/context/redux/status/selectors/sidebar";

const Redirector = () => {
  const navigate = useNavigate();
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const isProjectsLoading = useAppSelector(selectIsPorjectLoading);
  const isSidebarActiveTabIsLoading = useAppSelector(
    selectSidebarActiveTabIsLoading,
  );
  const selectedTab = useAppSelector(selectSelectedTab);
  const activeRequestOrFolder = useAppSelector(selectActiveRequestOrFolder);
  const activeMockRequestOrFolder = useAppSelector(
    selectActiveMockRequestOrFolder,
  );
  const sidebarActiveTab =
    useAppSelector(selectSidebarActiveTab) ?? "navigate_projects";

  useEffect(() => {
    if (isProjectsLoading || isSidebarActiveTabIsLoading) return;

    let route = "";
    if (
      activeProjectId &&
      sidebarActiveTab === "navigate_collections" &&
      activeRequestOrFolder
    ) {
      route = `${route}${SIDEBAR_MENU_ID_PATH_MAP["navigate_collections"]}/${activeRequestOrFolder.method ? "request" : "folder"}/${activeRequestOrFolder.id}`;
    } else if (
      activeProjectId &&
      sidebarActiveTab === "navigate_mock" &&
      activeMockRequestOrFolder
    ) {
      route = `${route}${SIDEBAR_MENU_ID_PATH_MAP["navigate_mock"]}/${activeMockRequestOrFolder.method ? "request" : "folder"}/${activeMockRequestOrFolder.id}`;
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
    activeMockRequestOrFolder,
  ]);

  return null;
};

export default Redirector;
