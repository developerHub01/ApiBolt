import { ButtonHTMLAttributes, memo } from "react";
import TabBottomCTA from "@/components/app/tab-sidebar/TabBottomCTA";
import { Plus as AddIcon } from "lucide-react";
import { useTabSidebar } from "@/context/tab-sidebar/TabSidebarProvider";

interface Props extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick"
> {
  isOpen?: boolean;
}

const AddNewTab = memo(({ isOpen, ...props }: Props) => {
  const { isTabListOpen, handleAdd } = useTabSidebar();

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
