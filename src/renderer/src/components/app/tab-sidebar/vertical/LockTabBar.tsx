import { useCallback } from "react";
import { useAppDispatch } from "@/context/redux/hooks";
import TabBottomCTA from "@/components/app/tab-sidebar/TabBottomCTA";
import { handleToggleTabListCollapse } from "@/context/redux/request-response/request-response-slice";
import { useTabSidebar } from "@/context/tab-sidebar/TabSidebarProvider";

const LockTabBar = () => {
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
      Icon={isCollapsed ? UnlockIcon : LockIcon}
      label={`${isCollapsed ? "Unlock" : "Lock"} Collapsed`}
    />
  );
};

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-4.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
    />
  </svg>
);

const UnlockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-4.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
    />
  </svg>
);

export default LockTabBar;
