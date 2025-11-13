import { useEffect } from "react";
import { useAppSelector } from "@/context/redux/hooks";
import { useNavigate } from "react-router-dom";
import { SIDEBAR_MENU_LIST } from "@/constant/sidebar.constant";
import { selectSidebarActiveTab } from "@/context/redux/sidebar/selectors/sidebar";
import { selectSelectedTab } from "@/context/redux/request-response/selectors/tab-list";
import { selectActiveRequestOrFolder } from "@/context/redux/request-response/selectors/request-list";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";
import { selectIsPorjectLoading } from "@/context/redux/status/selectors/projects";
import { selectSidebarActiveTabIsLoading } from "@/context/redux/status/selectors/sidebar";

const Redirector = () => {
  const navigate = useNavigate();
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const isProjectsLoading = useAppSelector(selectIsPorjectLoading);
  const isSidebarActiveTabIsLoading = useAppSelector(
    selectSidebarActiveTabIsLoading
  );
  const selectedTab = useAppSelector(selectSelectedTab);
  const activeRequestOrFolder = useAppSelector(selectActiveRequestOrFolder);
  const sidebarActiveTab = useAppSelector(selectSidebarActiveTab);

  useEffect(() => {
    if (isProjectsLoading || isSidebarActiveTabIsLoading) return;

    let route = "";
    if (!activeProjectId) {
      route =
        SIDEBAR_MENU_LIST.find((entry) => entry.id === sidebarActiveTab)
          ?.path ?? "/projects";
    } else if (
      sidebarActiveTab === "navigate_collections" &&
      activeRequestOrFolder
    ) {
      route = `${route}/${activeRequestOrFolder.method ? "request" : "folder"}/${activeRequestOrFolder.id}`;
    } else {
      route =
        SIDEBAR_MENU_LIST.find(
          (item) => item.id === sidebarActiveTab?.toLowerCase()
        )?.path ?? "/";
    }

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
