import { memo, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip-custom";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { Link } from "react-router-dom";
import { changeActiveTab } from "@/context/redux/sidebar/thunks/sidebar";
import {
  HIDDEN_TABS_WHEN_NOT_PROJECT_SELECTED,
  SIDEBAR_MENU_LIST,
} from "@/constant/sidebar.constant";
import type { TSidebarTab } from "@/types/sidebar.types";
import { handleToggleRequestList } from "@/context/redux/request-response/request-response-slice";
import { selectSidebarActiveTab } from "@/context/redux/sidebar/selectors/sidebar";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";
import { selectApplyingKeyboardShortcuts } from "@/context/redux/keyboard-shortcuts/selectors/keyboard-shortcuts";
import { keyListStringify } from "@/utils/keyboard-shortcut.utils";

const SidebarMenu = memo(() => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(selectSidebarActiveTab);
  const shortcuts = useAppSelector(selectApplyingKeyboardShortcuts);

  const menuList = useMemo(() => {
    return SIDEBAR_MENU_LIST.map((item) => {
      const binding = shortcuts[item.id];

      return {
        ...item,
        label: binding
          ? `${item.label} (${keyListStringify(binding)})`
          : item.label,
      };
    });
  }, [shortcuts]);

  const handleClick = useCallback(
    async (id: TSidebarTab) => {
      if (id === "navigate_collections" && activeTab === id) {
        dispatch(handleToggleRequestList());
        return;
      }
      await dispatch(changeActiveTab(id));
    },
    [activeTab, dispatch]
  );
  const activeProjectId = useAppSelector(selectActiveProjectId);

  return (
    <>
      {menuList.map(({ id, Icon, label, path }) => {
        if (
          !activeProjectId &&
          HIDDEN_TABS_WHEN_NOT_PROJECT_SELECTED.includes(id)
        )
          return null;

        return (
          <Tooltip key={id}>
            <TooltipTrigger asChild>
              <Link to={path}>
                <Button
                  size={"icon"}
                  variant={activeTab === id ? "default" : "background"}
                  className="mt-auto"
                  onClick={() => handleClick(id)}
                >
                  <Icon />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" variant={"secondary"}>
              <p>{label}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </>
  );
});

SidebarMenu.displayName = "Sidebar menu";

export default SidebarMenu;
