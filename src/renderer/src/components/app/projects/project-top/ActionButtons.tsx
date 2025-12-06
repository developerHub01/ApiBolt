import { useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Plus as AddIcon, Download as ImportIcon } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";
import { useProject } from "@/context/project/ProjectProvider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip-custom";
import { importProject } from "@/context/redux/project/thunks/projects";
import { useAppDispatch } from "@/context/redux/hooks";
import useCustomToast from "@/hooks/ui/use-custom-toast";

const ActionButtons = () => {
  const dispatch = useAppDispatch();
  const toast = useCustomToast();
  const { handleChangeIsCreateDialogOpen } = useProject();

  const handleCreate = useCallback(() => {
    handleChangeIsCreateDialogOpen(true);
  }, [handleChangeIsCreateDialogOpen]);

  const handleImport = useCallback(async () => {
    const { success, message } = await dispatch(importProject()).unwrap();

    toast({
      type: success ? "success" : "error",
      title: success ? "Import success" : "Import error",
      description: message,
    });
  }, [dispatch, toast]);

  const menuList = useMemo(
    () => [
      {
        id: "create",
        label: "Create New Project",
        Icon: AddIcon,
        onClick: handleCreate,
      },
      {
        id: "import",
        label: "Import New Project",
        Icon: ImportIcon,
        onClick: handleImport,
      },
    ],
    [handleCreate, handleImport],
  );

  return (
    <ButtonGroup className="divide-x">
      {menuList.map(({ id, label, Icon, onClick }) => (
        <Tooltip key={id}>
          <TooltipTrigger asChild>
            <Button variant={"secondary"} size={"icon"} onClick={onClick}>
              <Icon />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" align="end" variant={"secondary"}>
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </ButtonGroup>
  );
};

export default ActionButtons;
