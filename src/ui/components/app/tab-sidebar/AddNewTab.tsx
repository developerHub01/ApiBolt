import { memo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { addNewTab } from "@/context/redux/request-response/request-response-thunk";
import TabBottomCTA from "@/components/app/tab-sidebar/TabBottomCTA";
import { Plus as AddIcon } from "lucide-react";

const AddNewTab = memo(() => {
  const dispatch = useAppDispatch();
  const isHovering = useAppSelector(
    (state) => state.requestResponse.isTabListHovering
  );

  const handleAdd = useCallback(() => {
    dispatch(addNewTab());
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
