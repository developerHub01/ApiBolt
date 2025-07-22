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

  useEffect(() => {
    let activeSidebarTab: TSidebarTab = "projects";

    if (activeProjectId) {
      const savedTab = localStorage.getItem(localStorageSidebarActiveTabKey);

      if (savedTab) activeSidebarTab = savedTab as TSidebarTab;
    }

    /* this is because I dont want to update localstorage just need to sync it in redux state */
    dispatch(handleChangeActiveTab(activeSidebarTab));

    const route =
      sidebarMenuList.find((item) => item.id === activeSidebarTab)?.path ?? "/";

    /* find the path from the list */
    navigate(route);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProjectId]);

  return null;
};

export default Redirector;
