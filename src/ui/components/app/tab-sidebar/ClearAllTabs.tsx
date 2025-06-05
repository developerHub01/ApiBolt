import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import TabBottomCTA from "@/components/app/tab-sidebar/TabBottomCTA";
import { Trash2 as ClearIcon } from "lucide-react";
import { handleClearTabList } from "@/context/redux/request-response/request-response-slice";

const ClearAllTabs = () => {
  const dispatch = useAppDispatch();
  const isHovering = useAppSelector(
    (state) => state.requestResponse.isTabListHovering
  );

  const handleClearAllTabs = useCallback(() => {
    dispatch(handleClearTabList());
  }, [dispatch]);

  return (
    <TabBottomCTA
      isHovering={isHovering}
      onClick={handleClearAllTabs}
      Icon={ClearIcon}
      label="Clear Tabs"
    />
  );
};

export default ClearAllTabs;
