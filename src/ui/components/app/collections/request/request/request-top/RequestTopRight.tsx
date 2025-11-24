import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Upload as ExportIcon,
  EllipsisVertical as ThreeDotIcon,
  Download as ImportIcon,
  BrushCleaning as ClearIcon,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  clearRequest,
  exportRequest,
  importRequest,
} from "@/context/redux/request-response/thunks/request";
import { toast } from "sonner";
import { selectSelectedTab } from "@/context/redux/request-response/selectors/tab-list";
// import { selectSelectedTab } from "@/context/redux/request-response/selectors/tab-list";

const RequestTopRight = () => {
  const dispatch = useAppDispatch();
  const selectedTab = useAppSelector(selectSelectedTab);

  const handleImport = useCallback(async () => {
    const { success, message } = await dispatch(importRequest()).unwrap();
    if (success) toast.success(message);
    else toast.error(message);
  }, [dispatch]);

  const handleExport = useCallback(async () => {
    const { success, message } = await dispatch(exportRequest()).unwrap();
    if (success) toast.success(message);
    else toast.error(message);
  }, [dispatch]);

  const handleClear = useCallback(async () => {
    // const { success, message } =
    await dispatch(clearRequest()).unwrap();
    // if (success) toast.success(message);
    // else toast.error(message);
  }, [dispatch]);

  const actionList = [
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
      id: "clear",
      label: "clear all",
      Icon: ClearIcon,
      onClick: handleClear,
    },
  ];

  if (!selectedTab) return null;

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
