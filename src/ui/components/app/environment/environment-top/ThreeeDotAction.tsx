import { useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  deleteAllEnvironments,
  exportEnvironments,
} from "@/context/redux/environments/thunks/environments";
import {
  EllipsisVertical as ThreeDotIcon,
  Upload as ExportIcon,
  FileDown as ImportIcon,
  Trash2 as DeleteIcon,
  type LucideIcon,
} from "lucide-react";
import { selectEnvironmentsList } from "@/context/redux/environments/selectors/environments";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const listItemToHide = new Set(["export", "delete"]);

const ThreeeDotAction = () => {
  const dispatch = useAppDispatch();
  const haveListItem = useAppSelector((state) =>
    Boolean(Object.keys(selectEnvironmentsList(state) ?? {}).length)
  );

  const handleExport = useCallback(async () => {
    const response = await dispatch(exportEnvironments()).unwrap();
    if (response) toast.success("Environment variables exported successfully!");
    else toast.error("Something went wrong while exporting list.");
  }, [dispatch]);

  const handleDeleteAll = useCallback(async () => {
    const response = await dispatch(deleteAllEnvironments()).unwrap();
    if (response) toast.success("Environment variables deleted successfully!");
    else toast.error("Something went wrong while exporting list.");
  }, [dispatch]);

  const actionButtonList: Array<{
    id: string;
    label: string;
    Icon: LucideIcon;
    onClick?: () => void;
  }> = useMemo(
    () =>
      [
        {
          id: "import",
          label: "Import",
          Icon: ImportIcon,
        },
        {
          id: "export",
          label: "Export",
          Icon: ExportIcon,
          onClick: handleExport,
        },
        {
          id: "delete",
          label: "Delete all",
          Icon: DeleteIcon,
          onClick: handleDeleteAll,
        },
      ].filter((item /* if no list item then dont hide listItemToHides */) =>
        haveListItem ? true : !listItemToHide.has(item.id)
      ),
    [handleDeleteAll, handleExport, haveListItem]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <ThreeDotIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="p-0 w-fit min-w-40 flex flex-col [&>button]:justify-start"
      >
        <DropdownMenuGroup>
          {actionButtonList.map(({ id, onClick, label, Icon }) => (
            <DropdownMenuItem asChild key={id}>
              <Button
                variant={"ghost"}
                onClick={onClick}
                className="w-full justify-start"
              >
                <Icon /> {label}
              </Button>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThreeeDotAction;
