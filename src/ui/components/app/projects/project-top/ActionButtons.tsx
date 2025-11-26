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

const ActionButtons = () => {
  const { handleChangeIsCreateDialogOpen } = useProject();

  const handleCreate = useCallback(() => {
    handleChangeIsCreateDialogOpen(true);
  }, [handleChangeIsCreateDialogOpen]);

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
        onClick: () => {},
      },
    ],
    [handleCreate]
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
