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
import { selectSelectedTab } from "@/context/redux/request-response/selectors/tab-list";
import useCustomToast from "@/hooks/ui/use-custom-toast";

const RequestTopRight = () => {
  const dispatch = useAppDispatch();
  const selectedTab = useAppSelector(selectSelectedTab);
  const toast = useCustomToast();

  const handleImport = useCallback(async () => {
    const { success, message } = await dispatch(
      importRequest(selectedTab),
    ).unwrap();
    toast({
      type: success ? "success" : "error",
      title: success ? "Import Success" : "Import Error",
      description: message,
    });
  }, [dispatch, selectedTab, toast]);

  const handleExport = useCallback(async () => {
    const { success, message } = await dispatch(exportRequest()).unwrap();
    toast({
      type: success ? "success" : "error",
      title: success ? "Export Success" : "Export Error",
      description: message,
    });
  }, [dispatch, toast]);

  const handleClear = useCallback(async () => {
    const { success, message } = await dispatch(clearRequest()).unwrap();
    toast({
      type: success ? "success" : "error",
      title: success ? "Cleared" : "Clear Error",
      description: message,
    });
  }, [dispatch, toast]);

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
