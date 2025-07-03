import { memo } from "react";
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
  Layers as ProjectsIcon,
} from "lucide-react";
import {
  // handleChangeActiveTab,
  type TSidebarTab,
} from "@/context/redux/sidebar/sidebar-slice";
import { useAppSelector } from "@/context/redux/hooks";
import { Link } from "react-router-dom";

const menuList: Array<{
  id: TSidebarTab;
  Icon: LucideIcon;
  label: string;
  path: string;
}> = [
  {
    id: "projects",
    Icon: ProjectsIcon,
    label: "Projects",
    path: "/projects",
  },
  {
    id: "collections",
    Icon: CollectionsIcon,
    label: "Collections",
    path: "/collections",
  },
  {
    id: "environments",
    Icon: EnvironmentsIcon,
    label: "Environments",
    path: "/environments",
  },
];

const hiddenTabsWhenNotProjectSelected: Array<TSidebarTab> = [
  "collections",
  "environments",
];

const SidebarMenu = memo(() => {
  // const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.sidebar.activeTab);

  // const handleClick = useCallback(
  //   (id: TSidebarTab) => dispatch(handleChangeActiveTab(id)),
  //   [dispatch]
  // );
  const activeProjectId = useAppSelector(
    (state) => state.requestResponse.activeProjectId
  );

  return (
    <div className="flex flex-col gap-2">
      {menuList.map(({ id, Icon, label, path }) => {
        if (!activeProjectId && hiddenTabsWhenNotProjectSelected.includes(id))
          return null;

        return (
          <Tooltip key={id}>
            <TooltipTrigger asChild>
              <Link to={path}>
                <Button
                  size={"icon"}
                  variant={activeTab === id ? "default" : "outline"}
                  className="mt-auto"
                >
                  <Icon />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{label}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
});

SidebarMenu.displayName = "Sidebar menu";

export default SidebarMenu;
