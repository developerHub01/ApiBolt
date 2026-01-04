import { ButtonHTMLAttributes, memo, useCallback } from "react";
import { useAppDispatch } from "@/context/redux/hooks";
import TabBottomCTA from "@/components/app/tab-sidebar/vertical/TabBottomCTA";
import { Plus as AddIcon } from "lucide-react";
import { addNewTabsData } from "@/context/redux/request-response/thunks/tab-list";
import { useTabSidebar } from "@/context/tab-sidebar/TabSidebarProvider";

interface Props extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick"
> {
  isOpen?: boolean;
}

const AddNewTab = memo(({ isOpen, ...props }: Props) => {
  const dispatch = useAppDispatch();
  const { isTabListOpen } = useTabSidebar();

  const handleAdd = useCallback(() => {
    dispatch(
      addNewTabsData({
        autoSelect: true,
      }),
    );
  }, [dispatch]);

  return (
    <TabBottomCTA
      isOpen={isOpen ?? isTabListOpen}
      onClick={handleAdd}
      Icon={AddIcon}
      label="Add Tab"
      {...props}
    />
  );
});

export default AddNewTab;
