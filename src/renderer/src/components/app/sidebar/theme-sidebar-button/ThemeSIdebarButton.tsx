import { Fragment, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip-custom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/context/redux/hooks";
import { selectSidebarActiveTab } from "@/context/redux/sidebar/selectors/sidebar";
import type {
  SidebarMenuItemInterface,
  TSidebarTab,
} from "@shared/types/sidebar.types";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { selectApplyingKeyboardShortcuts } from "@/context/redux/keyboard-shortcuts/selectors/keyboard-shortcuts";
import { keyListStringify } from "@/utils/keyboard-shortcut.utils";
import { SIDEBAR_THEME_MENU_ITEMS } from "@/constant/sidebar.constant";

interface Props extends SidebarMenuItemInterface {
  onClick: (id: TSidebarTab) => Promise<void>;
}

const ThemeSIdebarButton = ({ label, Icon, onClick }: Props) => {
  const activeTab = useAppSelector(selectSidebarActiveTab);
  const localtion = useLocation();
  const shortcuts = useAppSelector(selectApplyingKeyboardShortcuts);
  const menuList = useMemo(() => {
    return SIDEBAR_THEME_MENU_ITEMS.map((item) => {
      const binding = shortcuts[item.id];

      return {
        ...item,
        shortcut: binding ? `(${keyListStringify(binding)})` : undefined,
      };
    });
  }, [shortcuts]);

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              variant={
                activeTab?.startsWith("navigate_themes")
                  ? "default"
                  : "background"
              }
              className="mt-auto"
            >
              <Icon />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="right" variant={"secondary"}>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent className="w-fit" align="start" side="right">
        <DropdownMenuGroup>
          {menuList.map(({ id, label, path, Icon, shortcut }) => (
            <Fragment key={id}>
              <DropdownMenuItem
                id={id}
                className={cn("cursor-pointer capitalize focus:bg-accent/70", {
                  "bg-accent text-accent-foreground":
                    localtion.pathname === path,
                })}
                onClick={() => onClick(id)}
              >
                <Icon size={14} /> {label}
                {shortcut && (
                  <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>
                )}
              </DropdownMenuItem>
            </Fragment>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSIdebarButton;
