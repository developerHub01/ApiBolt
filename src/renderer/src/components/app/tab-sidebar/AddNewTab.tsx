import { memo, useCallback } from "react";
import { useAppDispatch } from "@/context/redux/hooks";
import TabBottomCTA from "@/components/app/tab-sidebar/TabBottomCTA";
import { Plus as AddIcon } from "lucide-react";
import { addNewTabsData } from "@/context/redux/request-response/thunks/tab-list";
import { useTabSidebar } from "@/context/tab-sidebar/TabSidebarProvider";

const AddNewTab = memo(() => {
  const dispatch = useAppDispatch();
  const { isTabListHovering: isHovering } = useTabSidebar();

  const handleAdd = useCallback(() => {
    dispatch(addNewTabsData());
  }, [dispatch]);

  return (
    <TabBottomCTA
      isHovering={isHovering}
      onClick={handleAdd}
      Icon={AddIcon}
      label="Add Tab"
    />
  );
});

export default AddNewTab;
