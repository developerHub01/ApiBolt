import React, {
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
import { useTabSidebar } from "@/context/tab-sidebar/TabSidebarProvider";
import { useAppDispatch } from "@/context/redux/hooks";
import {
  addNewTabsData,
  addNewTabsToLeftOrRight,
  removeTab,
} from "@/context/redux/request-response/thunks/tab-list";
import { handleClearTabList } from "@/context/redux/request-response/request-response-slice";
import useTabContextMenuList from "@/hooks/tab-sidebar/use-tab-context-menu-list";
import { TContextMenuActionType } from "@shared/types/tab-sidebar";

interface Props {
  children: React.ReactNode;
}

const TabSidebarContextMenuWrapper = memo(({ children }: Props) => {
  const dispatch = useAppDispatch();
  const [selectedTab, setSetSelectedTab] = useState<string | null>(null);
  const { handleChangeIsContextMenuOpen } = useTabSidebar();

  const menuItem = useTabContextMenuList({
    selectedTab,
  });

  const handleContextMenu = (e: MouseEvent<HTMLSpanElement>) => {
    const targetElement = e.target as HTMLElement;
    const targetedItem = targetElement.closest("[data-tab-id]") as HTMLElement;
    setSetSelectedTab(targetedItem?.dataset.tabId ?? null);
  };

  const handleAction = useCallback(
    (id: TContextMenuActionType) => {
      switch (id) {
        case "close_tab": {
          if (!selectedTab) return;
          return dispatch(
            removeTab({
              id: selectedTab,
              type: "current",
            }),
          );
        }
        case "close_left_tabs": {
          if (!selectedTab) return;
          return dispatch(
            removeTab({
              id: selectedTab,
              type: "all-left",
            }),
          );
        }
        case "close_right_tabs": {
          if (!selectedTab) return;
          return dispatch(
            removeTab({
              id: selectedTab,
              type: "all-right",
            }),
          );
        }
        case "close_other_tabs": {
          if (!selectedTab) return;
          return dispatch(
            removeTab({
              id: selectedTab,
              type: "others",
            }),
          );
        }
        case "close_all_tabs":
          return dispatch(handleClearTabList());
        case "open_tab":
          return dispatch(addNewTabsData());
        case "open_left_tab": {
          if (!selectedTab) return;
          return dispatch(
            addNewTabsToLeftOrRight({
              id: selectedTab,
              type: "left",
            }),
          );
        }
        case "open_right_tab": {
          if (!selectedTab) return;
          return dispatch(
            addNewTabsToLeftOrRight({
              id: selectedTab,
              type: "right",
            }),
          );
        }
        default:
          return;
      }
    },
    [dispatch, selectedTab],
  );

  return (
    <ContextMenu onOpenChange={handleChangeIsContextMenuOpen} modal={false}>
      <ContextMenuTrigger
        className="w-full h-full flex-1"
        onContextMenu={handleContextMenu}
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
});

export default TabSidebarContextMenuWrapper;
