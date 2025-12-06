import { useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  deleteAllEnvironments,
  exportEnvironments,
  importEnvironments,
} from "@/context/redux/environments/thunks/environments";
import {
  EllipsisVertical as ThreeDotIcon,
  Upload as ExportIcon,
  Download as ImportIcon,
  Trash2 as DeleteIcon,
  type LucideIcon,
} from "lucide-react";
import { selectEnvironmentsList } from "@/context/redux/environments/selectors/environments";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useCustomToast from "@/hooks/ui/use-custom-toast";

const listItemToHide = new Set(["export", "delete"]);

const ThreeeDotAction = () => {
  const dispatch = useAppDispatch();
  const toast = useCustomToast();
  const haveListItem = useAppSelector(state =>
    Boolean(Object.keys(selectEnvironmentsList(state) ?? {}).length),
  );

  const handleImport = useCallback(async () => {
    const { success, message } = await dispatch(importEnvironments()).unwrap();
    toast({
      type: success ? "success" : "error",
      title: success ? "Import success" : "Import error",
      description: message,
    });
  }, [dispatch, toast]);

  const handleExport = useCallback(async () => {
    const { success, message } = await dispatch(exportEnvironments()).unwrap();
    toast({
      type: success ? "success" : "error",
      title: success ? "Export success" : "Export error",
      description: message,
    });
  }, [dispatch, toast]);

  const handleDeleteAll = useCallback(async () => {
    const response = await dispatch(deleteAllEnvironments()).unwrap();
    toast({
      type: response ? "success" : "error",
      title: response ? "Delete success" : "Delete error",
      description: response
        ? "Environment variables deleted successfully!"
        : "Something went wrong while exporting list.",
    });
  }, [dispatch, toast]);

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
          onClick: handleImport,
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
        haveListItem ? true : !listItemToHide.has(item.id),
      ),
    [handleDeleteAll, handleExport, handleImport, haveListItem],
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
