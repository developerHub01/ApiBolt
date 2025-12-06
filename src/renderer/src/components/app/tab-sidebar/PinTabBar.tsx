import { useCallback } from "react";
import { useAppDispatch } from "@/context/redux/hooks";
import TabBottomCTA from "@/components/app/tab-sidebar/TabBottomCTA";
import { Pin as PinIcon, PinOff as UnPinIcon } from "lucide-react";
import { handleToggleTabListCollapse } from "@/context/redux/request-response/request-response-slice";
import { useTabSidebar } from "@/context/tab-sidebar/TabSidebarProvider";

const PinTabBar = () => {
  const dispatch = useAppDispatch();
  const { isTabListOpen, isCollapsed } = useTabSidebar();

  const handleClick = useCallback(
    () => dispatch(handleToggleTabListCollapse()),
    [dispatch],
  );

  return (
    <TabBottomCTA
      isOpen={isTabListOpen}
      onClick={handleClick}
      Icon={isCollapsed ? UnPinIcon : PinIcon}
      label={`${isCollapsed ? "Unpin" : "Pin"} Collapsed`}
    />
  );
};

export default PinTabBar;
