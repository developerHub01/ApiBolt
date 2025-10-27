import { useEffect } from "react";
import { useAppSelector } from "@/context/redux/hooks";
import { useNavigate } from "react-router-dom";
import { SIDEBAR_MENU_LIST } from "@/constant/sidebar.constant";
import { selectSidebarActiveTab } from "@/context/redux/sidebar/sidebar-selector";
import { selectSelectedTab } from "@/context/redux/request-response/selectors/tab-list";
import { selectActiveRequestOrFolder } from "@/context/redux/request-response/selectors/request-list";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";

const Redirector = () => {
  const navigate = useNavigate();
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const selectedTab = useAppSelector(selectSelectedTab);
  const activeRequestOrFolder = useAppSelector(selectActiveRequestOrFolder);
  const sidebarActiveTab = useAppSelector(selectSidebarActiveTab);

  useEffect(() => {
    let route = "";
    if (!activeProjectId) {
      route =
        SIDEBAR_MENU_LIST.find((entry) => entry.id === "navigate_projects")
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProjectId, selectedTab, sidebarActiveTab]);

  return null;
};

export default Redirector;
