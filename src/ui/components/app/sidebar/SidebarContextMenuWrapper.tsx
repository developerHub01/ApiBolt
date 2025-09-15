import React, { useCallback } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import useCheckApplyingLayout from "@/hooks/setting/use-check-applying-layout";
import type { TLayoutSetting } from "@/types/setting.types";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { updateSettings } from "@/context/redux/setting/setting-thunk";
import { handleToggleRequestList } from "@/context/redux/request-response/request-response-slice";
import { selectIsRequestListCollapsed } from "@/context/redux/request-response/selectors/request-list";

interface SidebarContextMenuWrapperProps {
  children: React.ReactNode;
}

const SidebarContextMenuWrapper = ({
  children,
}: SidebarContextMenuWrapperProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-fit">
        <SidebarMenuItemLayout />
        <SidebarMenuItemToggleCollectionList />
      </ContextMenuContent>
    </ContextMenu>
  );
};

const SidebarMenuItemLayout = () => {
  const layoutTypes: TLayoutSetting = useCheckApplyingLayout();
  const dispatch = useAppDispatch();
  const handleChangeLayout = useCallback(
    () =>
      dispatch(
        updateSettings({
          layoutType: layoutTypes === "rtl" ? "ltr" : "rtl",
        })
      ),
    [dispatch, layoutTypes]
  );

  return (
    <ListItem
      label={`Move Primary Sidebar ${layoutTypes === "rtl" ? "Left" : "Right"}`}
      onClick={handleChangeLayout}
    />
  );
};

const SidebarMenuItemToggleCollectionList = () => {
  const dispatch = useAppDispatch();
  const requestListCollapsed = useAppSelector(selectIsRequestListCollapsed);

  const handleToggle = useCallback(
    () => dispatch(handleToggleRequestList()),
    [dispatch]
  );

  return (
    <ListItem
      label={`${requestListCollapsed ? "Expand" : "Collapse"} Primary Sidebar`}
      onClick={handleToggle}
    />
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
