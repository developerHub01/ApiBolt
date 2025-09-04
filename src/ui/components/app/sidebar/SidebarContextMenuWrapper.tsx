import React, { useCallback } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import useCheckApplyingLayout from "@/hooks/setting/use-check-applying-layout";
import type { TLayoutSetting } from "@/types/setting.types";
import { useAppDispatch } from "@/context/redux/hooks";
import { updateSettings } from "@/context/redux/setting/setting-thunk";

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
    <ContextMenuItem onClick={handleChangeLayout}>
      Move Primary Sidebar {layoutTypes === "rtl" ? "Left" : "Right"}
    </ContextMenuItem>
  );
};

export default SidebarContextMenuWrapper;
