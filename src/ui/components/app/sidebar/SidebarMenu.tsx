import { memo, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { Link } from "react-router-dom";
import { loadProjectList } from "@/context/redux/request-response/request-response-thunk";
import { changeActiveTab as changeSidebarActiveTab } from "@/context/redux/sidebar/sidebar-thunk";
import {
  hiddenTabsWhenNotProjectSelected,
  sidebarMenuList,
} from "@/constant/sidebar.constant";
import type { TSidebarTab } from "@/types/sidebar.types";
import { handleToggleRequestList } from "@/context/redux/request-response/request-response-slice";

const SidebarMenu = memo(() => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.sidebar.activeTab);

  useEffect(() => {
    dispatch(loadProjectList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = useCallback(
    (id: TSidebarTab) => {
      if (id === "collections" && activeTab === id) {
        dispatch(handleToggleRequestList());
        return;
      }
      dispatch(changeSidebarActiveTab(id));
    },
    [activeTab, dispatch]
  );
  const activeProjectId = useAppSelector(
    (state) => state.requestResponse.activeProjectId
  );

  return (
    <div className="flex flex-col gap-2">
      {sidebarMenuList.map(({ id, Icon, label, path }) => {
        if (!activeProjectId && hiddenTabsWhenNotProjectSelected.includes(id))
          return null;

        return (
          <Tooltip key={id}>
            <TooltipTrigger asChild>
              <Link to={path}>
                <Button
                  size={"icon"}
                  variant={activeTab === id ? "default" : "outline"}
                  className="mt-auto"
                  onClick={() => handleClick(id)}
                >
                  <Icon />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{label}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
});

SidebarMenu.displayName = "Sidebar menu";

export default SidebarMenu;
