import { ButtonHTMLAttributes, useCallback } from "react";
import { useAppDispatch } from "@/context/redux/hooks";
import TabBottomCTA from "@/components/app/tab-sidebar/vertical/TabBottomCTA";
import { Trash2 as ClearIcon } from "lucide-react";
import { handleClearTabList } from "@/context/redux/request-response/request-response-slice";
import { useTabSidebar } from "@/context/tab-sidebar/TabSidebarProvider";

interface Props extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick"
> {
  isOpen?: boolean;
}

const ClearAllTabs = ({ isOpen, ...props }: Props) => {
  const dispatch = useAppDispatch();
  const { isTabListOpen } = useTabSidebar();

  const handleClearAllTabs = useCallback(() => {
    dispatch(handleClearTabList());
  }, [dispatch]);

  return (
    <TabBottomCTA
      isOpen={isOpen ?? isTabListOpen}
      onClick={handleClearAllTabs}
      Icon={ClearIcon}
      label="Clear Tabs"
      {...props}
    />
  );
};

export default ClearAllTabs;
