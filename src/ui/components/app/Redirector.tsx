import { useEffect } from "react";
import { handleChangeActiveTab } from "@/context/redux/sidebar/sidebar-slice";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { useNavigate } from "react-router-dom";
import type { TSidebarTab } from "@/types/sidebar.types";
import {
  localStorageSidebarActiveTabKey,
  sidebarMenuList,
} from "@/constant/sidebar.constant";

const Redirector = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const activeProjectId = useAppSelector(
    (state) => state.requestResponse.activeProjectId
  );
  const selectedTab = useAppSelector(
    (state) => state.requestResponse.selectedTab
  );
  const activeRequestOrFolder = useAppSelector(
    (state) =>
      state.requestResponse.requestList?.[
        state.requestResponse.selectedTab ?? ""
      ] ?? null
  );

  useEffect(() => {
    let activeSidebarTab: TSidebarTab = "projects";

    if (activeProjectId) {
      const savedTab = localStorage.getItem(localStorageSidebarActiveTabKey);

      if (savedTab) activeSidebarTab = savedTab as TSidebarTab;
    }

    /* this is because I dont want to update localstorage just need to sync it in redux state */
    dispatch(handleChangeActiveTab(activeSidebarTab));

    let route =
      sidebarMenuList.find((item) => item.id === activeSidebarTab)?.path ?? "/";

    /* if route is activeTab is collection so route '/' and have activeRequestOrFolder */
    if (activeSidebarTab === "collections" && activeRequestOrFolder) {
      if (route === "/") route = "";
      route = `${route}/${activeRequestOrFolder.method ? "request" : "folder"}/${activeRequestOrFolder.id}`;
    }

    /* find the path from the list */
    navigate(route);

    /* activeProjectId, selectedTab === so that in both case update the url */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProjectId, selectedTab]);

  return null;
};

export default Redirector;
