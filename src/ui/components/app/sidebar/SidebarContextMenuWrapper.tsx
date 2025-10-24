import React, { useCallback, useMemo } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { handleToggleRequestList } from "@/context/redux/request-response/request-response-slice";
import { selectIsRequestListCollapsed } from "@/context/redux/request-response/selectors/request-list";
import { selectSidebarActiveTab } from "@/context/redux/sidebar/sidebar-selector";
import { updateSettings } from "@/context/redux/setting/thunk/setting-thunk";
import { selectActiveProjectId } from "@/context/redux/request-response/selectors/project";

interface SidebarContextMenuWrapperProps {
  children: React.ReactNode;
}

const SidebarContextMenuWrapper = ({
  children,
}: SidebarContextMenuWrapperProps) => {
  const dispatch = useAppDispatch();
  const activeProjectId = useAppSelector(selectActiveProjectId);
  // const layoutTypes: TLayoutSetting = useCheckApplyingLayoutDirection();
  // const handleChangeLayout = useCallback(
  //   () =>
  //     dispatch(
  //       updateSettings({
  //         layoutType: layoutTypes === "rtl" ? "ltr" : "rtl",
  //       })
  //     ),
  //   [dispatch, layoutTypes]
  // );

  const requestListCollapsed = useAppSelector(selectIsRequestListCollapsed);
  const activeSidebarTab = useAppSelector(selectSidebarActiveTab);

  const handleToggleRequestListBar = useCallback(
    () => dispatch(handleToggleRequestList()),
    [dispatch]
  );

  const handleHideActivityBar = useCallback(() => {
    dispatch(
      updateSettings({
        activityBarVisible: 0,
        projectId: activeProjectId,
      })
    );
  }, [activeProjectId, dispatch]);

  const menuList = useMemo(() => {
    const list: Array<{
      id: string;
      label: string;
      onClick: () => void;
    }> = [];
    /* layout menu item */
    /**
     * ===========================================================
     * This setting is under development so we are not rendering it for now
     * ===========================================================
     * ***/
    // list.push({
    //   id: "layout",
    //   label: `Move Primary Sidebar ${layoutTypes === "rtl" ? "Left" : "Right"}`,
    //   onClick: handleChangeLayout,
    // });

    /* toggle request list sidebar  */
    if (activeSidebarTab === "collections") {
      list.push({
        id: "request-list-sidebar",
        label: `${requestListCollapsed ? "Expand" : "Collapse"} Primary Sidebar`,
        onClick: handleToggleRequestListBar,
      });
    }

    list.push({
      id: "activity-bar",
      label: `Hide activity bar`,
      onClick: handleHideActivityBar,
    });

    return list;
  }, [
    activeSidebarTab,
    handleHideActivityBar,
    handleToggleRequestListBar,
    requestListCollapsed,
  ]);

  if (!menuList.length) return null;

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-fit">
        {menuList.map(({ id, label, onClick }) => (
          <ListItem key={id} label={label} onClick={onClick} />
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
};

interface ListItemProps {
  label: string;
  onClick?: () => void;
}

const ListItem = ({ label, onClick }: ListItemProps) => (
  <ContextMenuItem onClick={onClick} className="text-xs">
    {label}
  </ContextMenuItem>
);

export default SidebarContextMenuWrapper;
