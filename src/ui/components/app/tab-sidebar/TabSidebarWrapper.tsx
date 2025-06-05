import React, { useEffect } from "react";
import { useAppDispatch } from "@/context/redux/hooks";
import { handleInitActiveTab } from "@/context/redux/sidebar/sidebar-slice";

interface TabSidebarWrapperProps {
  children: React.ReactNode;
}

const TabSidebarWrapper = ({ children }: TabSidebarWrapperProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(handleInitActiveTab());
  }, [dispatch]);

  return <>{children}</>;
};

export default TabSidebarWrapper;
