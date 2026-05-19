import React, {
  ComponentProps,
  Fragment,
  memo,
  MouseEvent,
  useCallback,
  useState,
} from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  ContextMenuShortcut,
} from "@/components/ui/context-menu";
import { useAppDispatch } from "@/context/redux/hooks";
import useTabContextMenuList from "@/hooks/tab-sidebar/use-tab-context-menu-list";
import { TContextMenuActionType } from "@shared/types/tab-sidebar";
import { cn } from "@/lib/utils";
import { useTabsView } from "@/context/tabs-view/TabsViewProvider";

interface Props extends ComponentProps<"div"> {
  children: React.ReactNode;
}

const TabsSidebarContextMenuWrapper = memo(
  ({ children, className = "", ...props }: Props) => {
    const dispatch = useAppDispatch();
    const [selectedTab, setSetSelectedTab] = useState<string | null>(null);
    const {
      handleChangeIsContextMenuOpen,
      handleRemove,
      handleAdd,
      handleAddNewtabsToLeftOrRight,
      handleClearAllTabs,
    } = useTabsView();

    const menuItem = useTabContextMenuList({
      selectedTab,
    });

    const handleContextMenu = (e: MouseEvent<HTMLSpanElement>) => {
      const targetElement = e.target as HTMLElement;
      const targetedItem = targetElement.closest(
        "[data-tab-id]",
      ) as HTMLElement;
      setSetSelectedTab(targetedItem?.dataset.tabId ?? null);
    };

    const handleAction = useCallback(
      (id: TContextMenuActionType) => {
        switch (id) {
          case "close_tab": {
            if (!selectedTab) return;
            return handleRemove({
              id: selectedTab,
              type: "current",
            });
          }
          case "close_left_tabs": {
            if (!selectedTab) return;
            return handleRemove({
              id: selectedTab,
              type: "all-left",
            });
          }
          case "close_right_tabs": {
            if (!selectedTab) return;
            return handleRemove({
              id: selectedTab,
              type: "all-right",
            });
          }
          case "close_other_tabs": {
            if (!selectedTab) return;
            return handleRemove({
              id: selectedTab,
              type: "others",
            });
          }
          case "close_all_tabs":
            return handleClearAllTabs();
          case "open_tab":
            return handleAdd();
          case "open_left_tab": {
            if (!selectedTab) return;
            return handleAddNewtabsToLeftOrRight({
              id: selectedTab,
              type: "left",
            });
          }
          case "open_right_tab": {
            if (!selectedTab) return;
            return handleAddNewtabsToLeftOrRight({
              id: selectedTab,
              type: "right",
            });
          }
          default:
            return;
        }
      },
      [
        handleAdd,
        handleAddNewtabsToLeftOrRight,
        handleClearAllTabs,
        handleRemove,
        selectedTab,
      ],
    );

    return (
      <ContextMenu onOpenChange={handleChangeIsContextMenuOpen} modal={false}>
        <ContextMenuTrigger
          className={cn("w-full h-full flex-1", className)}
          onContextMenu={handleContextMenu}
          {...props}
        >
          {children}
        </ContextMenuTrigger>
        <ContextMenuContent>
          {Object.entries(menuItem).map(([category, submenu], index, arr) => (
            <Fragment key={category}>
              {submenu.map(({ id, label, shortcut }) => (
                <ContextMenuItem
                  key={id}
                  className="capitalize text-xs"
                  onSelect={() => handleAction(id)}
                >
                  {label}
                  {Boolean(shortcut) && (
                    <ContextMenuShortcut>{shortcut}</ContextMenuShortcut>
                  )}
                </ContextMenuItem>
              ))}
              {index + 1 < arr.length && <ContextMenuSeparator />}
            </Fragment>
          ))}
        </ContextMenuContent>
      </ContextMenu>
    );
  },
);

export default TabsSidebarContextMenuWrapper;
