import { ButtonHTMLAttributes } from "react";
import TabBottomCTA from "@renderer/components/app/tab-sidebar/TabBottomCTA";
import { Trash2 as ClearIcon } from "lucide-react";
import { useTabSidebar } from "@/context/tab-sidebar/TabSidebarProvider";

interface Props extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick"
> {
  isOpen?: boolean;
}

const ClearAllTabs = ({ isOpen, ...props }: Props) => {
  const { isTabListOpen, handleClearAllTabs } = useTabSidebar();

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
