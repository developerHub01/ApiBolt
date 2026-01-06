import { memo, useCallback, useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip-custom";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { changeActiveTab } from "@/context/redux/sidebar/thunks/sidebar";
import {
  HIDDEN_TABS_WHEN_NOT_PROJECT_SELECTED,
  SIDEBAR_MENU_LIST,
} from "@/constant/sidebar.constant";
import type {
  SidebarMenuItemInterface,
  TSidebarTab,
} from "@shared/types/sidebar.types";
import { handleToggleRequestList } from "@/context/redux/request-response/request-response-slice";
import { selectSidebarActiveTab } from "@/context/redux/sidebar/selectors/sidebar";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";
import { selectApplyingKeyboardShortcuts } from "@/context/redux/keyboard-shortcuts/selectors/keyboard-shortcuts";
import { keyListStringify } from "@/utils/keyboard-shortcut.utils";
import SidebarActionButton from "@/components/app/sidebar/SidebarActionButton";
import { handleToggleThemeListCollapsed } from "@/context/redux/theme/theme-slice";

const SidebarMenu = memo(() => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(selectSidebarActiveTab);
  const shortcuts = useAppSelector(selectApplyingKeyboardShortcuts);

  const menuList: Array<SidebarMenuItemInterface> = useMemo(() => {
    return SIDEBAR_MENU_LIST.map(item => {
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
      if ([id, activeTab].every(item => item === "navigate_collections")) {
        dispatch(handleToggleRequestList());
        return;
      } else if (
        [id, activeTab].every(item => item === "navigate_themes_marketplace")
      ) {
        dispatch(handleToggleThemeListCollapsed());
        return;
      }
      await dispatch(changeActiveTab(id));
    },
    [activeTab, dispatch],
  );
  const activeProjectId = useAppSelector(selectActiveProjectId);

  return (
    <div className="flex flex-col items-center">
      {menuList.map(({ id, Icon, label }) => {
        if (
          !activeProjectId &&
          HIDDEN_TABS_WHEN_NOT_PROJECT_SELECTED.includes(id)
        )
          return null;

        return (
          <Tooltip key={id}>
            <TooltipTrigger asChild>
              <SidebarActionButton
                size={"icon"}
                isActive={activeTab === id}
                onClick={() => handleClick(id)}
                Icon={Icon}
              />
            </TooltipTrigger>
            <TooltipContent side="right" variant={"secondary"}>
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
