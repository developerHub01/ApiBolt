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
} from "@/components/ui/context-menu";
import { useTabSidebar } from "@renderer/context/tab-sidebar/TabSidebarProvider";
import { useAppDispatch } from "@renderer/context/redux/hooks";
import {
  addNewTabsData,
  addNewTabsToLeftOrRight,
  removeTab,
} from "@renderer/context/redux/request-response/thunks/tab-list";
import { handleClearTabList } from "@renderer/context/redux/request-response/request-response-slice";

type TActionType =
  | "close-all"
  | "close"
  | "close-others"
  | "close-left"
  | "close-right"
  | "add-tab"
  | "add-left"
  | "add-right";

interface MenuItemInterface {
  id: TActionType;
  label: string;
}

const EMPTY_MENU: Record<string, Array<MenuItemInterface>> = {
  add: [
    {
      id: "add-tab",
      label: "add tab",
    },
  ],
  close: [
    {
      id: "close-all",
      label: "close all",
    },
  ],
};

const ELEMENT_MENU: Record<string, Array<MenuItemInterface>> = {
  add: [
    {
      id: "add-left",
      label: "add to top",
    },
    {
      id: "add-right",
      label: "add to bottom",
    },
  ],
  close: [
    {
      id: "close",
      label: "close",
    },
    {
      id: "close-all",
      label: "close all",
    },
    {
      id: "close-others",
      label: "close others",
    },
    {
      id: "close-left",
      label: "close from top",
    },
    {
      id: "close-right",
      label: "close to bottom",
    },
  ],
};

interface Props {
  children: React.ReactNode;
}

const TabSidebarContextMenuWrapper = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const [selectedTab, setSetSelectedTab] = useState<string | null>(null);
  const { handleChangeIsContextMenuOpen } = useTabSidebar();

  const menuItem = useMemo(
    () => (selectedTab ? ELEMENT_MENU : EMPTY_MENU),
    [selectedTab],
  );

  const handleContextMenu = (e: MouseEvent<HTMLSpanElement>) => {
    const targetElement = e.target as HTMLElement;
    const targetedItem = targetElement.closest("[data-tab-id]") as HTMLElement;
    setSetSelectedTab(targetedItem?.dataset.tabId ?? null);
  };

  const handleAction = useCallback(
    (id: TActionType) => {
      switch (id) {
        case "close": {
          if (!selectedTab) return;
          return dispatch(
            removeTab({
              id: selectedTab,
              type: "current",
            }),
          );
        }
        case "close-left": {
          if (!selectedTab) return;
          return dispatch(
            removeTab({
              id: selectedTab,
              type: "all-left",
            }),
          );
        }
        case "close-right": {
          if (!selectedTab) return;
          return dispatch(
            removeTab({
              id: selectedTab,
              type: "all-right",
            }),
          );
        }
        case "close-others": {
          if (!selectedTab) return;
          return dispatch(
            removeTab({
              id: selectedTab,
              type: "others",
            }),
          );
        }
        case "close-all":
          return dispatch(handleClearTabList());
        case "add-tab":
          return dispatch(addNewTabsData());
        case "add-left": {
          if (!selectedTab) return;
          return dispatch(
            addNewTabsToLeftOrRight({
              id: selectedTab,
              type: "left",
            }),
          );
        }
        case "add-right": {
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
      <ContextMenuContent className="w-42">
        {Object.entries(menuItem).map(([category, submenu], index, arr) => (
          <Fragment key={category}>
            {submenu.map(({ id, label }) => (
              <ContextMenuItem
                key={id}
                className="capitalize"
                onSelect={() => handleAction(id)}
              >
                {label}
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
