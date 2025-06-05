import { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Boxes as CollectionsIcon,
  Container as EnvironmentsIcon,
  type LucideIcon,
} from "lucide-react";
import {
  handleChangeActiveTab,
  type TSidebarTab,
} from "@/context/redux/sidebar/sidebar-slice";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";

const menuList: Array<{
  id: TSidebarTab;
  Icon: LucideIcon;
  label: string;
}> = [
  {
    id: "collections",
    Icon: CollectionsIcon,
    label: "Collections",
  },
  {
    id: "environments",
    Icon: EnvironmentsIcon,
    label: "Environments",
  },
];

const SidebarMenu = memo(() => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.sidebar.activeTab);

  const handleClick = useCallback(
    (id: TSidebarTab) => dispatch(handleChangeActiveTab(id)),
    [dispatch]
  );

  return (
    <div className="flex flex-col gap-2">
      {menuList.map(({ id, Icon, label }) => (
        <Tooltip key={id}>
          <TooltipTrigger asChild>
            <Button
              size={"icon"}
              variant={activeTab === id ? "default" : "outline"}
              onClick={() => handleClick(id)}
              className="mt-auto"
            >
              <Icon />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
});

SidebarMenu.displayName = "Sidebar menu";

export default SidebarMenu;
