import { useMemo } from "react";
import useCheckApplyingTabListLayoutDirection from "@/hooks/setting/use-check-applying-tab-list-layout-direction";
import { useAppSelector } from "@/context/redux/hooks";
import { selectApplyingKeyboardShortcuts } from "@/context/redux/keyboard-shortcuts/selectors/keyboard-shortcuts";
import { keyListStringify } from "@/utils/keyboard-shortcut.utils";
import { TContextMenuActionType } from "@shared/types/tab-sidebar";
import { TTabsLayoutSetting } from "@shared/types/setting.types";

interface MenuItemInterface {
  id: TContextMenuActionType;
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

const getElementMenu = (
  tabListLayoutType: TTabsLayoutSetting,
): Record<string, Array<MenuItemInterface>> => {
  const topString = tabListLayoutType === "right" ? "top" : "left";
  const bottomString = tabListLayoutType === "right" ? "bottom" : "right";
  return {
    add: [
      {
        id: "open_left_tab",
        label: `add to ${topString}`,
      },
      {
        id: "open_right_tab",
        label: `add to ${bottomString}`,
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
        label: `close from ${topString}`,
      },
      {
        id: "close_right_tabs",
        label: `close to ${bottomString}`,
      },
    ],
  };
};

interface Props {
  selectedTab: string | null;
}

const useTabContextMenuList = ({ selectedTab }: Props) => {
  const tabListLayoutType = useCheckApplyingTabListLayoutDirection();
  const shortcuts = useAppSelector(selectApplyingKeyboardShortcuts);
  const elementMenu = useMemo(
    () => getElementMenu(tabListLayoutType),
    [tabListLayoutType],
  );

  const menuItem = useMemo(() => {
    const menu = selectedTab ? elementMenu : EMPTY_MENU;

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
  }, [elementMenu, selectedTab, shortcuts]);

  return menuItem;
};

export default useTabContextMenuList;
