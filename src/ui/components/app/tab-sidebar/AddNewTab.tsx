import { memo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import TabBottomCTA from "@/components/app/tab-sidebar/TabBottomCTA";
import { Plus as AddIcon } from "lucide-react";
import { addNewTabsData } from "@/context/redux/request-response/thunks/tab-list";
import { selectIsTabListHovering } from "@/context/redux/request-response/selectors/tab-list";

const AddNewTab = memo(() => {
  const dispatch = useAppDispatch();
  const isHovering = useAppSelector(selectIsTabListHovering);

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
