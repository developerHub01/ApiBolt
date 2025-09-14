import { useAppSelector } from "@/context/redux/hooks";
import { selectSelectedTab } from "@/context/redux/request-response/request-response-selector";
import { selectSidebarActiveTab } from "@/context/redux/sidebar/sidebar-selector";
import type { TAuthContextType } from "@/types/authorization.types";

const useAuthContextType = (): TAuthContextType => {
  const selectedTab = useAppSelector(selectSelectedTab);
  const sidebarActiveTab = useAppSelector(selectSidebarActiveTab);

  return sidebarActiveTab === "collections" && selectedTab ? "local" : "global";
};

export default useAuthContextType;
