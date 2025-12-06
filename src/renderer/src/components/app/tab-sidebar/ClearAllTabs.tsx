import { useCallback } from "react";
import { useAppDispatch } from "@/context/redux/hooks";
import TabBottomCTA from "@/components/app/tab-sidebar/TabBottomCTA";
import { Trash2 as ClearIcon } from "lucide-react";
import { handleClearTabList } from "@/context/redux/request-response/request-response-slice";
import { useTabSidebar } from "@/context/tab-sidebar/TabSidebarProvider";

const ClearAllTabs = () => {
  const dispatch = useAppDispatch();
  const { isTabListOpen } = useTabSidebar();

  const handleClearAllTabs = useCallback(() => {
    dispatch(handleClearTabList());
  }, [dispatch]);

  return (
    <TabBottomCTA
      isOpen={isTabListOpen}
      onClick={handleClearAllTabs}
      Icon={ClearIcon}
      label="Clear Tabs"
    />
  );
};

export default ClearAllTabs;
