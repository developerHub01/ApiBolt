import React, {
  Fragment,
  MouseEvent,
  useCallback,
  useMemo,
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
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  addNewTabsData,
  addNewTabsToLeftOrRight,
  removeTab,
} from "@/context/redux/request-response/thunks/tab-list";
import { handleClearTabList } from "@/context/redux/request-response/request-response-slice";
import { selectApplyingKeyboardShortcuts } from "@/context/redux/keyboard-shortcuts/selectors/keyboard-shortcuts";
import { keyListStringify } from "@/utils/keyboard-shortcut.utils";

type TActionType =
  | "open_tab"
  | "open_left_tab"
  | "open_right_tab"
  | "close_tab"
  | "close_all_tabs"
  | "close_other_tabs"
  | "close_left_tabs"
  | "close_right_tabs"
  | "switch_left_tab"
  | "switch_right_tab";

interface MenuItemInterface {
  id: TActionType;
  label: string;
  shortcut?: string;
}

const EMPTY_MENU: Record<string, Array<MenuItemInterface>> = {
  add: [
    {
      id: "open_tab",
      label: "add tab",
    },
  ],
  close: [
    {
      id: "close_all_tabs",
      label: "close all",
    },
  ],
};

const ELEMENT_MENU: Record<string, Array<MenuItemInterface>> = {
  add: [
    {
      id: "open_left_tab",
      label: "add to top",
    },
    {
      id: "open_right_tab",
      label: "add to bottom",
    },
  ],
  close: [
    {
      id: "close_tab",
      label: "close",
    },
    {
      id: "close_all_tabs",
      label: "close all",
    },
    {
      id: "close_other_tabs",
      label: "close others",
    },
    {
      id: "close_left_tabs",
      label: "close from top",
    },
    {
      id: "close_right_tabs",
      label: "close to bottom",
    },
  ],
};

interface Props {
  children: React.ReactNode;
}

const TabSidebarContextMenuWrapper = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const shortcuts = useAppSelector(selectApplyingKeyboardShortcuts);
  const [selectedTab, setSetSelectedTab] = useState<string | null>(null);
  const { handleChangeIsContextMenuOpen } = useTabSidebar();

  const menuItem = useMemo(() => {
    const menu = selectedTab ? ELEMENT_MENU : EMPTY_MENU;

    Object.keys(menu).forEach(category => {
      const subMenu = menu[category];
      if (!subMenu) return;
      subMenu.forEach((item, index) => {
        const id = item.id;
        if (shortcuts[id])
          menu[category][index].shortcut = keyListStringify(shortcuts[id]);
      });
    });

    return menu;
  }, [selectedTab, shortcuts]);

  const handleContextMenu = (e: MouseEvent<HTMLSpanElement>) => {
    const targetElement = e.target as HTMLElement;
    const targetedItem = targetElement.closest("[data-tab-id]") as HTMLElement;
    setSetSelectedTab(targetedItem?.dataset.tabId ?? null);
  };

  const handleAction = useCallback(
    (id: TActionType) => {
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
                className="capitalize"
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
};

export default TabSidebarContextMenuWrapper;
