import { useEffect } from "react";
import { handleChangeActiveTab } from "@/context/redux/sidebar/sidebar-slice";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { useNavigate } from "react-router-dom";
import type { TSidebarTab } from "@/types/sidebar.types";
import {
  LOCAL_STORAGE_SIDEBAR_ACTIVE_TAB_KEY,
  SIDEBAR_MENU_LIST,
} from "@/constant/sidebar.constant";
import { selectSidebarActiveTab } from "@/context/redux/sidebar/sidebar-selector";
import {
  selectActiveProjectId,
  selectActiveRequestOrFolder,
  selectSelectedTab,
} from "@/context/redux/request-response/request-response-selector";

const Redirector = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const selectedTab = useAppSelector(selectSelectedTab);
  const activeRequestOrFolder = useAppSelector(selectActiveRequestOrFolder);
  const sidebarActiveTab = useAppSelector(selectSidebarActiveTab);

  useEffect(() => {
    let activeSidebarTab: TSidebarTab = "projects";

    if (activeProjectId) {
      const savedTab = localStorage.getItem(LOCAL_STORAGE_SIDEBAR_ACTIVE_TAB_KEY);

      if (savedTab) activeSidebarTab = savedTab as TSidebarTab;
    }

    /* this is because I dont want to update localstorage just need to sync it in redux state */
    dispatch(handleChangeActiveTab(activeSidebarTab));

    let route =
      SIDEBAR_MENU_LIST.find((item) => item.id === activeSidebarTab)?.path ?? "/";

    /* if route is activeTab is collection so route '/' and have activeRequestOrFolder */
    if (activeSidebarTab === "collections" && activeRequestOrFolder) {
      if (route === "/") route = "";
      route = `${route}/${activeRequestOrFolder.method ? "request" : "folder"}/${activeRequestOrFolder.id}`;
    }

    /* find the path from the list */
    if (location.pathname === route) return;
    navigate(route);

    /* activeProjectId, selectedTab === so that in both case update the url */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProjectId, selectedTab, sidebarActiveTab]);

  return null;
};

export default Redirector;
