import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Download as ExportIcon,
  EllipsisVertical as ThreeDotIcon,
  FileDown as ImportIcon,
  BrushCleaning as ClearIcon,
} from "lucide-react";
// import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
// import { selectSelectedTab } from "@/context/redux/request-response/selectors/tab-list";

const RequestTopRight = () => {
  // const dispatch = useAppDispatch();
  // const selectedTab = useAppSelector(selectSelectedTab);

  const actionList = [
    {
      id: "import",
      label: "Import",
      Icon: ImportIcon,
      onClick: () => {},
    },
    {
      id: "export",
      label: "Export",
      Icon: ExportIcon,
      onClick: () => {},
    },
    {
      id: "clear",
      label: "clear all",
      Icon: ClearIcon,
      onClick: () => {},
    },
  ];

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"icon"} variant={"ghost"}>
            <ThreeDotIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="p-0 w-fit min-w-40 flex flex-col [&>button]:justify-start"
          side="bottom"
          align="end"
        >
          <DropdownMenuGroup>
            {actionList.map(({ id, label, Icon, onClick }) => (
              <DropdownMenuItem asChild key={id}>
                <Button
                  id={id}
                  variant={"ghost"}
                  onClick={onClick}
                  className="w-full justify-start rounded-none capitalize"
                >
                  <Icon /> {label}
                </Button>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
RequestTopRight.displayName = "Request top right";

export default RequestTopRight;
